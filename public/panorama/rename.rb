filenames = Dir.glob("*.jpg")

filenames.each do |filename|
    File.rename(filename, "thumbnail" + filename)
end
