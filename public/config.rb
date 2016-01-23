# Require any additional compass plugins here.
# Uncomment line below to enable require
# require 'compass/import-once/activate'
require 'susy'

# Set this to the root of your project when deployed:
http_path = "/" 
css_dir = "css" 
add_import_path = "css"
sass_dir = "sass" 
images_dir = "img" 
javascripts_dir = "js" 


relative_assets = true 
# To enable relative paths to assets via compass helper functions. Uncomment:
# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed
# To disable debugging comments that display the original location of your selectors. Uncomment:
#line_comments = true
line_comments = false

#check for development file
developmentSettings = File.join(File.dirname(__FILE__), "config_local.rb")

if File.exist?(developmentSettings)
	css_dir = "css/min" 
	output_style= :expanded
	line_comments = true
end



#output_style = (environment == :production) ? :compressed : :expanded
# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Compile min css
# https://coderwall.com/p/gqqfgw/sass-compass-compile-two-different-files-for-development-and-production-environment-take-2
on_stylesheet_saved do |file|
  #`compass compile -c config_prod.rb --force`
  #`compass compile -e production --force`
  #`compass compile --time --css-dir=css/min --output-style compressed --force`
  #`compass compile -c config.rb --force`

    if File.exists?(file)
	filename = File.basename(file, File.extname(file))
	File.rename(file, File.dirname(__FILE__) + "/css/min/" + filename + ".min" + File.extname(file))
	end
end

