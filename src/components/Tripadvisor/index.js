import React from 'react';
import ReactDom from 'react-dom';
import queue from 'queue-async';
import './style.css'

const google = window.google;
const findDomNode = (node) => ReactDom.findDOMNode(node);

var TravelAdvisor = {
	directionsService: new google.maps.DirectionsService(),
	directionsRenderer: new google.maps.DirectionsRenderer(),
	elevationService: new google.maps.ElevationService(),
	longestDistance: 0,
	highestElevation: 0,
	lowestElevation: Infinity,
	chartWidth: 400,
	chartBarWidth: 2
};

var App = React.createClass({
	getInitialState: function(){
		return {
			start: '',
			end: '',
			routes: null,
			distanceUnit: localStorage['travelAdvisor:distanceUnit'] || 'km',
			heightUnit: localStorage['travelAdvisor:heightUnit'] || 'm',
			travelMode: 'walking'
		};
	},
	componentDidMount: function() {
	    // getRoutes();
	},
	componentDidUpdate: function(){
		localStorage['travelAdvisor:distanceUnit'] = this.state.distanceUnit;
		localStorage['travelAdvisor:heightUnit'] = this.state.heightUnit;
	},
	getRoutes: function(){
		var self = this;
		var state = this.state;

		TravelAdvisor.directionsService.route({
			origin: state.start,
			destination: state.end,
			travelMode: google.maps.TravelMode[this.state.travelMode.toUpperCase()],
			provideRouteAlternatives: true,
			unitSystem: google.maps.UnitSystem.METRIC
		}, function(response, status){
			if (status === google.maps.DirectionsStatus.OK) {
				var routes = response.routes;
				var longestDistance = 0;
				routes.forEach(function(route){
					var distance = route.legs[0].distance.value;
					if (distance > longestDistance) longestDistance = distance;
				});
				TravelAdvisor.longestDistance = longestDistance;
				self.setState({
					routes: routes.map(function(route, i){
						return {
							route: route,
							selected: (i === 0)
						};
					})
				});

				TravelAdvisor.directionsRenderer.setDirections(response);

				self.getElevations();
			} else {
				self.setState({
					routes: []
				});
			}
		});
	},
	getElevations: function(){
		var self = this;
		var routes = this.state.routes;

		var q = queue();

		routes.forEach(function(data, i){
			q.defer(function(done){
				var route = data.route;
				var path = route.overview_path;
				var distance = route.legs[0].distance.value;
				var samples = Math.round(distance/TravelAdvisor.longestDistance * (TravelAdvisor.chartWidth/TravelAdvisor.chartBarWidth));
				TravelAdvisor.elevationService.getElevationAlongPath({
					path: path,
					samples: samples
				}, function(result, status){
					if (status === google.maps.ElevationStatus.OK){
						done(null, {
							data: data,
							elevations: result
						});
					} else {
						done(status);
					}
				});
			});
		});


		q.awaitAll(function(error, results){
			if (error){
				console.log(error);
				return;
			}

			var highestElevation = 0, lowestElevation = Infinity;

			results.forEach(function(result, i){
				var elevations = result.elevations;
				var prevElevation = elevations[0].elevation;
				var rise = 0, drop = 0;

				elevations.forEach(function(r){
					var elevation = r.elevation;
					if (elevation > prevElevation) rise += elevation - prevElevation;
					if (elevation < prevElevation) drop += prevElevation - elevation;
					prevElevation = elevation;

					if (elevation > highestElevation) highestElevation = elevation;
					if (elevation < lowestElevation) lowestElevation = elevation;
				});

				result.data.stats = {
					rise: rise,
					drop: drop
				};
				result.data.elevations = elevations;
			});

			TravelAdvisor.highestElevation = highestElevation;
			TravelAdvisor.lowestElevation = lowestElevation;
			self.setState({
				routes: routes
			});
		});
	},
	handleRouteClick: function(index){
		this.state.routes.forEach(function(d, i){
			d.selected = (index === i);
		});
		this.setState(this.state);

		TravelAdvisor.directionsRenderer.setRouteIndex(index);
	},
	handleUnitChange: function(units){
		this.setState(units);
	},
	handleTravelModeChange: function(travelMode){
		this.setState({
			travelMode: travelMode
		});
	},
	handleUpdate: function(travelMode, start, end) {
      this.setState({
          travelMode,
          start,
          end
      });
      if (travelMode && start && end) {
        this.getRoutes();
      }
    },
	render: function(){
		var units = {
			distance: this.state.distanceUnit,
			height: this.state.heightUnit
		};
		var travelMode = this.state.travelMode;
		return (
			<div>
				<Map />
				<div id="sidebar">
					<header>
						<h1><Icon type="mountains" width="24" height="24"></Icon> Tour Advisor</h1>
					</header>
					<RouteForm start={this.state.start} end={this.state.end} units={units} travelMode={travelMode} onUnitChange={this.handleUnitChange} onTravelModeChange={this.handleTravelModeChange} onUpdate={this.handleUpdate}/>
					<RouteList data={this.state.routes} travelMode={travelMode} units={units} onRouteClick={this.handleRouteClick} />
				</div>
			</div>
		);
	}
});

var Icon = React.createClass({
	render: function(){
		var type = this.props.type;
		var title = this.props.title;
		return (
			<svg title={title} className="icon" dangerouslySetInnerHTML={{__html: '<use xlink:href="icons.svg#icon-' + type + '"></use>'}} width={this.props.width} height={this.props.height}></svg>
		);
	}
});

var Map = React.createClass({
	getDefaultProps: function(){
		return {
			map: {
				center: new google.maps.LatLng(-27.4698, 153.0251),
				zoom: 10,
				disableDefaultUI: true
			}
		};
	},
	statics: {
		pinpointMarker: new google.maps.Marker({
			visible: false,
			clickable: false,
			zIndex: 1000
		}),
		showPinpointMarker: function(location){
			this.pinpointMarker.setPosition(location);
			this.pinpointMarker.setVisible(true);
		},
		hidePinpointMarker: function(){
			this.pinpointMarker.setVisible(false);
		}
	},
	componentDidMount: function(){
		var node = findDomNode(this);
		var map = new google.maps.Map(node, this.props.map);
		Map.pinpointMarker.setMap(map);

		TravelAdvisor.directionsRenderer.setMap(map);
	},
	render: function(){
		return (
			<div id="map-canvas"></div>
		);
	}
});

var Chart = React.createClass({
	handleBarMouseEnter: function(index){
		this.props.onBarMouseEnter(index);
	},
	handleBarMouseLeave: function(){
		this.props.onBarMouseLeave();
	},
	render: function(){
		var self = this;
		var props = this.props;
		var chartStyle = {
			width: props.width,
			height: 0 // initially zero height
		};
		var bars = '';
		if (props.data){
			bars = props.data.map(function(d, i){
				var style = {
					borderBottomWidth: props.height * d.value / props.domain[1]
				};
				var key = i + '-' + d.value;
				return (
					<div style={style} key={key} onMouseEnter={self.handleBarMouseEnter.bind(self, i)} onMouseLeave={self.handleBarMouseLeave}><span>{d.title}</span></div>
				);
			});
			chartStyle.height = props.height; // then grow the height, CSS transition applied here
		}
		return (
			<div className="chart" style={chartStyle}>
				{bars}
			</div>
		)
	}
});

var RouteForm = React.createClass({
	onUpdate: function(){
      var travelMode = findDomNode(this.refs.travelMode).value;
      var start = findDomNode(this.refs.start).value.trim();
      var end = findDomNode(this.refs.end).value.trim();

	    this.props.onUpdate(travelMode, start, end);
	},
	handleSubmit: function(e){
	  e.preventDefault();

		this.onUpdate();
	},
	componentDidMount: function(){
		var startNode = findDomNode(this.refs.start);
		var endNode = findDomNode(this.refs.end);
		var start = startNode.value.trim();
		var end = endNode.value.trim();

		if (start && end){
			if (this.props.start) startNode.value = this.props.start;
			if (this.props.end) endNode.value = this.props.end;
		}

		new google.maps.places.Autocomplete(startNode);
		new google.maps.places.Autocomplete(endNode);
	},
	componentWillReceiveProps: function(){
		if (this.props.travelMode) findDomNode(this.refs.travelMode).value = this.props.travelMode;
		if (this.props.start) findDomNode(this.refs.start).value = this.props.start;
		if (this.props.end) findDomNode(this.refs.end).value = this.props.end;
	},
	handleTravelModeChange: function(){
		this.onUpdate();
	},
	handleFlip: function(e){
		e.preventDefault();
    this.onUpdate();
	},
	handleDistanceChange: function(){
		var unit = findDomNode(this.refs.distanceSelect).value;
		this.props.onUnitChange({
			distanceUnit: unit
		});
	},
	handleHeightChange: function(){
		var unit = findDomNode(this.refs.heightSelect).value;
		this.props.onUnitChange({
			heightUnit: unit
		});
	},
	render: function(){
		var units = this.props.units;
		return (
			<form id="directions-form" onSubmit={this.handleSubmit}>
				<div className="field-section">
						<select ref="travelMode" onChange={this.handleTravelModeChange}>
							<option value="walking">Walking</option>
							<option value="bicycling">Bicycling</option>
							<option value="driving">Driving</option>
						</select><br />
          <label htmlFor="start">from</label>
					<input ref="start" id="directions-start" placeholder="Start" required />
				</div>
				<a href="#" id="flip-direction" onClick={this.handleFlip} title="Flip origin and destination" tabIndex="-1"><Icon type="arrow-right" width="14" height="14"></Icon></a>
				<div className="field-section">
					<label htmlFor="directions-end">To</label>
					<input ref="end" id="directions-end" placeholder="Destination" required />
				</div>
				<div className="form-footer">
					<div className="options">
						<Icon type="widget" width="20" height="20" title="Settings"></Icon>
						<span>
							<label>Distance&nbsp;
								<select ref="distanceSelect" value={units.distance} onChange={this.handleDistanceChange}>
									<option value="km">km</option>
									<option value="miles">miles</option>
								</select>
							</label>&nbsp;
							<label>Height&nbsp;
								<select ref="heightSelect" value={units.height} onChange={this.handleHeightChange}>
									<option value="m">m</option>
									<option value="ft">ft</option>
								</select>
							</label>
						</span>
					</div>
					<button>Go</button>
				</div>
			</form>
		);
	}
});

var RouteList = React.createClass({
	handleClick: function(index){
		this.props.onRouteClick(index);
	},
	handlePinpoint: function(data){
		this.props.onSetPinpoint(data);
	},
	render: function(){
		var self = this;
		var data = this.props.data;
		if (data && data.length){
			var routes = this.props.data.map(function(d, i){
				var key = i + '' + d.route.bounds.toString();
				return (
					<li key={key} className={d.selected ? 'selected' : ''} onClick={self.handleClick.bind(self, i)}>
						<Route data={d} units={self.props.units} travelMode={self.props.travelMode} onSetPinpoint={self.handlePinpoint} />
					</li>
				);
			})
			return (
				<div id="routes-container">
					<ul id="routes-list">
						{routes}
					</ul>
				</div>
			);
		} else if (!!data){
			return (
				<div id="routes-container">
					<p>Oops, there are no routes found.</p>
				</div>
			);
		} else {
			return (
				<div id="routes-container">
					<p>Begin by entering the Start and Destination locations above.</p>
					<p>Try an example: <a href="#walking/Chinatown, SF/Twin Peaks, SF">Walking from Chinatown to Twin Peaks</a></p>
				</div>
			)
		}
	}
});

var Route = React.createClass({
	handleBarHover: function(index){
		if (index){
			var data = this.props.data.elevations[index];
			Map.showPinpointMarker(data.location);
		} else {
			Map.hidePinpointMarker();
		}
	},
	iconMap: {
		walking: 'pedestrian',
		bicycling: 'bicycle',
		driving: 'car-side'
	},
	render: function(){
		var data = this.props.data;
		var units = this.props.units;
		var route = data.route;
		var leg = route.legs[0];
		var distance = leg.distance.value;
		var width = Math.ceil(distance/TravelAdvisor.longestDistance * TravelAdvisor.chartWidth);
		//var chartWidth = {width: width};
		var stats = data.stats;
		var domain = [0, TravelAdvisor.highestElevation];

		var iconType = this.iconMap[this.props.travelMode];

		var height = Math.round((TravelAdvisor.highestElevation - TravelAdvisor.lowestElevation) / 2);
		var rise = null, drop = null, heightUnit = units.height;
		if (stats){
			var statsRise = stats.rise, statsDrop = stats.drop;
			rise = Math.round(heightUnit === 'm' ? statsRise : statsRise*3.28084) + ' ' + heightUnit;
			drop = Math.round(heightUnit === 'm' ? statsDrop : statsDrop*3.28084) + ' ' + heightUnit;
		}

		var distanceUnit = units.distance;
		var distanceVal = leg.distance.value;

		distance = (distanceUnit === 'km' ? distanceVal/1000 : distanceVal*0.000621371).toFixed(2) + ' ' + distanceUnit;
		var riseStat = rise ? <span><Icon type="arrow-graph-up-right" width="14" height="14" title="Rise"></Icon> {rise}</span> : '';
		var dropStat = drop ? <span><Icon type="arrow-graph-down-right" width="14" height="14" title="Drop"></Icon> {drop}</span> : '';

		var elevations = data.elevations ? data.elevations.map(function(d){
			var elevation = d.elevation;
			return {
				value: elevation,
				title: Math.round(heightUnit === 'm' ? elevation : elevation*3.28084) + ' ' + heightUnit
			}
		}) : null;

		return (
			<a>
				<div className="heading">
					<Icon type={iconType} width="24" height="24" title={iconType}></Icon> via {route.summary}
				</div>
				<Chart data={elevations} domain={domain} width={width} height={height} onBarMouseEnter={this.handleBarHover} onBarMouseLeave={this.handleBarHover} />
				<div className="stats">{riseStat}&nbsp;&nbsp;&nbsp;{dropStat}</div>
				<div className="metadata">{leg.duration.text}&nbsp;&nbsp;&nbsp;{distance}</div>
			</a>
		);
	}
});

export default App;