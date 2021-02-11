'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	// $('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);

	//getting data from server
	var projectUrl = '/project/' + idNumber;
	console.log(projectUrl);
	$.get(projectUrl, callbackFn);


}

function callbackFn(result) {
	//console.log(result);

	var title = result['title'];

  	var projectHTML = '<a href="#" class="thumbnail">' +
    '<img class="detailsImage" src="' + result['image'] + '">' +
    '<p>' + title + '</p>' +
    '<p><small>' + result['date'] +
    '</small></p></a>';

    //console.log(projectHTML);

    // ***** HOW TO SELECT THE RIGHT DIV
    // ***** want to select div with class=details under div with class=thumbnail under div with id={{id}}
    // ***** {{id}} needs to be the same as result['id']
    // ***** bruh i didn't know {{id}} had "project" in it >:(
    var projDetailSelector = "#project" + result['id'] + " div.thumbnail div.details";
    console.log(projDetailSelector);

    //inserting project details
	$(projDetailSelector).html(projectHTML);
	$(projDetailSelector).append(result['summary']);
};
