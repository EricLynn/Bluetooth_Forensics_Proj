$.getJSON("a.json", function(json) {
    
        // Find a <table> element with id="myTable":
        var table = document.getElementById("table");
        table.innerHTML = "";
        // Create an empty <thead> element and add it to the table:
        var header = table.createTHead();
        header.id = "thead";

        // Create an empty <tr> element and add it to the first position of <thead>:
        var row = header.insertRow(0);


        var cell = row.insertCell(0);
        cell.className = "col1";
        cell.innerHTML = "BluetoothData";

        var cell1 = row.insertCell(0); 
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); 

        // Add some bold text in the new cell:
        cell.setAttribute("style", "visibility: hidden");
        cell.width = "1%";
        
        cell1.innerHTML = "<b>Bluetooth ID</b>";
        cell2.innerHTML = "<b>Date spotted</b>";
        cell3.innerHTML = "<b>Related Devices</b>";
        
        cell3.width = "40%";
        
        tblbody = document.createElement("tbody");
        tblbody.id = "tbody";
		
		for (var currentDevice in json){
			var row = tblbody.insertRow();
			var cell1 = row.insertCell(0); 
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
			
			cell1.innerHTML = currentDevice;
			cell2.innerHTML = json[currentDevice].timestamp;
			cell3.innerHTML = json[currentDevice].profile;
			table.appendChild(tblbody);
		}
});
