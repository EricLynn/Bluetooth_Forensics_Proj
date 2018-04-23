var indexID = 0;

function getRelatedInfo(id, profileInfo)
{
    var profileInfoString = profileInfo + '';
    var profiles = profileInfoString.split(',');
    var profileInfoFormatted = "";
    
    for (var i = 0; i < profileInfo.length; i++)
    {      
        profileInfoFormatted += profiles[i] + '\n';
    }
    
    alert(profileInfoFormatted);
    $('#dvRelatedDevices').text(profileInfoFormatted);
}

$.getJSON("bt_profiles.json", function(json) {
    
        // Find a <table> element with id="myTable":
        var table = document.getElementById("table");
        table.innerHTML = "";
        // Create an empty <thead> element and add it to the table:
        var header = table.createTHead();
        header.id = "thead";

        // Create an empty <tr> element and add it to the first position of <thead>:
        var row = header.insertRow(0);

        var cell1 = row.insertCell(0); 
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Add some bold text in the new cell:
        cell1.outerHTML = "<th>Bluetooth ID</th>"
        cell2.outerHTML = "<th>Date spotted</th>";
        cell3.outerHTML = "<th>Related Devices</th>";
        
        cell3.width = "40%";
        
        tblbody = document.createElement("tbody");
        tblbody.id = "tbody";
        
        // var indexID = 0;
        for (var currentDevice in json) 
        {
			var row = tblbody.insertRow();
			var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
			
			cell1.innerHTML = currentDevice;
			cell2.innerHTML = json[currentDevice].timestamp;
			cell3.innerHTML = "*None yet*";
			if(json[currentDevice].profile.length != 0) {
                var profileInfo = json[currentDevice].profile;
                var profileInfoFormat = JSON.stringify(profileInfo);
                cell3.innerHTML = "<button id=link"+ indexID +" onclick='getRelatedInfo("+ indexID +"," + profileInfoFormat + ")'> Click here for related devices! </button>";
 
                console.log(indexID);
			}
			else{
				
			}
            table.appendChild(tblbody);
            indexID++;
		}
});


