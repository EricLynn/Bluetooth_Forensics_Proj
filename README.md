# Bluetooth_Forensics_Proj by Jatin Bhakta, Eric M. Lynn, and Chris Heisler

This is a visual display of data extracted from packets intercepted using Ubertooth technology.
Data packets were parsed into JSON format and are displayed on a webpage using JQuery.

To run this program in yoru browser, run a web server to host the files in this project on.
My personal favorite method of doing so is to run python from command line inside of the folder you downloaded the project to- 

python --version # to get the version
# If Python version returned above is 3.X
python -m http.server <port#>
# If Python version returned above is 2.X
python -m SimpleHTTPServer <port#>
