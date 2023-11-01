function search(value) {
	return data.resume.filter((n) => n.basics.AppliedFor.toLowerCase().startsWith(value.toLowerCase()))
}

function showSearchResultsAndHideResume() {
	document.getElementById('search-result-area').style.display = 'block';
	document.getElementById('resume-display-area').style.display = 'none';
}

function showResumeAndHideSearchResults() {
	document.getElementById('search-result-area').style.display = 'none'
	document.getElementById('resume-display-area').style.display = 'block'
}

function renderProject(project) {
	let projectNode = document.getElementById('project-details')
	projectNode.innerHTML = "";
	let pname = project.name
	let pdesc = project.description
	let pnameNode = document.createElement('b')
	pnameNode.innerText = pname + ': '
	let pdescNode = document.createElement('span')
	pdescNode.innerText = pdesc
	projectNode.appendChild(pnameNode)
	projectNode.appendChild(pdescNode)
}

function renderPI(basics) {
	let mNum = document.getElementById('mobile-number')
	let email = document.getElementById('email')
	let linkedin = document.getElementById('linkedin')

	mNum.innerText = basics.phone
	email.innerText = basics.email

	linkedin.innerHTML = ''
	let lNode = document.createElement('a')
	lNode.innerText = 'Linkedin'
	lNode.href = basics.profiles.url
	linkedin.appendChild(lNode)
}

function renderEducation(education) {
	let ugNode = document.getElementById('ug')
	let ssNode = document.getElementById('senior-secondary')
	let hsNode = document.getElementById('high-school')

	ugNode.innerText = `${education.UG.institute}, ${education.UG.course}, ${education.UG['Start Date']}, ${education.UG['End Date']}, ${education.UG.cgpa}`
	ssNode.innerText = `${education['Senior Secondary'].institute}, ${education['Senior Secondary'].cgpa}`
	hsNode.innerText = `${education['High School'].institute}, ${education['High School'].cgpa}`
}

function renderResumeHeader(name, appliedFor) {
	let nameNode = document.getElementById('name')
	let appliedForNode = document.getElementById('appliedFor')
	nameNode.innerText = name;
	appliedForNode.innerText = appliedFor;
}

function renderCompanyDetails(companyDetails) {
	let prevCompanyName = document.getElementById('prev-company-name')
	let prevCompanyPosition = document.getElementById('prev-company-position')
	let prevCompanyStartDate = document.getElementById('prev-company-start-date')
	let prevCompanyEndDate = document.getElementById('prev-company-end-date')
	let prevCompanySummary = document.getElementById('prev-company-summary')

	prevCompanyName.innerText = companyDetails['Company Name']
	prevCompanyPosition.innerText = companyDetails.Position
	prevCompanyStartDate.innerText = companyDetails['Start Date']
	prevCompanyEndDate.innerText = companyDetails['End Date']
	prevCompanySummary.innerText = companyDetails.Summary
}

function renderTechnicalSkills(keywords) {
	let tech_skills = document.getElementById('tech-skills')
	tech_skills.innerHTML = ''
	keywords.forEach(k => {
		tech_skills.appendChild(document.createTextNode(k));
		tech_skills.appendChild(document.createElement('br'));
	})
}

function renderHobbies(hobbies) {
	let hobbiesNode = document.getElementById('hobbies')
	hobbiesNode.innerHTML = ''
	hobbies.forEach(h => {
		hobbiesNode.appendChild(document.createTextNode(h));
		hobbiesNode.appendChild(document.createElement('br'));
	})
}

function renderInternship(internship) {
	let prevInternName = document.getElementById('internship-name')
	let prevInternPosition = document.getElementById('internship-position')
	let prevInternStartDate = document.getElementById('internship-start-date')
	let prevInternEndDate = document.getElementById('internship-end-date')
	let prevInternSummary = document.getElementById('internship-summary')

	prevInternName.innerText = internship['Company Name']
	prevInternPosition.innerText = internship.Position
	prevInternStartDate.innerText = internship['Start Date']
	prevInternEndDate.innerText = internship['End Date']
	prevInternSummary.innerText = internship.Summary
}

function renderAchievements(achievements) {
	let achievementList = document.getElementById('achievements')
	achievementList.innerHTML = ''
	achievements.forEach(a => {
		let lNode = document.createElement('li')
		lNode.innerText = a
		achievementList.appendChild(lNode);
	})
}

function checkAndDisableNavButtons(searchResult) {
	const prevButton = document.getElementById('prev-btn');
	const nextButton = document.getElementById('next-btn');

	const allIds = window.searchResults.map((s) => s.id);
	const currResultIdx = allIds.indexOf(searchResult.id);

	// Show both "Prev" and "Next" buttons by default
	prevButton.style.visibility = 'visible';
	nextButton.style.visibility = 'visible';

	// Hide "Prev" button if at the first result
	if (currResultIdx === 0) {
		prevButton.style.visibility = 'hidden';
	}

	// Hide "Next" button if at the last result
	if (currResultIdx === allIds.length - 1) {
		nextButton.style.visibility = 'hidden';
	}

}

function renderSearchResult(searchResult) {
	window.currItem = searchResult;
	showResumeAndHideSearchResults();

	renderResumeHeader(searchResult.basics.name, searchResult.basics.AppliedFor)
	renderPI(searchResult.basics)
	renderTechnicalSkills(searchResult.skills.keywords)
	renderHobbies(searchResult.interests.hobbies)
	renderCompanyDetails(searchResult.work)
	renderProject(searchResult.projects)
	renderEducation(searchResult.education)
	renderInternship(searchResult.Internship)
	renderAchievements(searchResult.achievements.Summary)
	checkAndDisableNavButtons(searchResult);

}

function createSearchResultLink(searchResult) {
	let elem = document.createElement('a')
	elem.innerText = searchResult.basics.name;
	elem.setAttribute('href', '#')
	elem.addEventListener('click', () => renderSearchResult(searchResult))
	elem.setAttribute('data', `result: ${searchResult}`);
	return elem
}

function toggleClearButton() {
	const searchInput = document.getElementById('search-bar');
	const clearButton = document.getElementById('clear-search');

	if (searchInput.value.trim() !== '') {
		clearButton.style.visibility = 'visible';
	} else {
		clearButton.style.visibility = 'hidden';
	}
	updateAfterSearch(); // Update the search results on input change
}

function clearSearch() {
	const searchInput = document.getElementById('search-bar');
	searchInput.value = ''; // Clear the search input
	searchInput.focus(); // Set the focus back to the search bar

	document.getElementById('clear-search').style.visibility = 'hidden'; // Hide the clear button
	toggleClearButton();
	updateAfterSearch(); // Update the search results
}

function updateAfterSearch() {
	let searchKeyword = document.getElementById('search-bar').value;
	if (searchKeyword.length === 0) {
		window.currItem = data.resume[0]
		window.searchResults = data.resume
		document.getElementById('next-btn').style.visibility = 'visible'
		document.getElementById('prev-btn').style.visibility = 'hidden'
		renderSearchResult(data.resume[0])
		return;
	}

	let searchResults = search(searchKeyword);
	window.searchResults = searchResults;
	let listDiv = document.getElementById('search-results')
	listDiv.innerHTML = '';
	if (searchResults.length === 0) {
		listDiv.innerHTML = `
			<div style="border: 2px solid black; border-radius: 5px; padding: 50px; margin-left: 20%; margin-right: 20%; 
			margin-top:110px; box-shadow: 0 0 5px 2px black;">
				<img width='150' height='150' src='image/no-result.png' alt='No results found'/>
				<span style="text-align: center; margin-left: 70px; font-size: 30px;">No such results found</span>
			</div>
			<section style="height: 100vh;  background-color: transparent;"></section>
		`;
		document.getElementById('next-btn').style.visibility = 'hidden'
		document.getElementById('prev-btn').style.visibility = 'hidden'
	}

	else if (searchResults.length === 1) {
		document.getElementById('next-btn').style.visibility = 'hidden'
		document.getElementById('prev-btn').style.visibility = 'hidden'
	}
	else {
		document.getElementById('next-btn').style.visibility = 'visible'
		document.getElementById('prev-btn').style.visibility = 'hidden'
	}

	showSearchResultsAndHideResume();

	for (let index = 0; index < searchResults.length; index++) {
		let searchResult = searchResults[index];
		let pageNode = document.createElement('div');
		pageNode.className = 'search-result-page';

		// Add the result number as a label
		let resultNumber = document.createElement('p');
		resultNumber.innerText = `Result ${index + 1}`;
		pageNode.appendChild(resultNumber);

		renderSearchResult(searchResult);

		listDiv.appendChild(pageNode);
	};
}

function handleNext() {
	const allIds = window.searchResults.map((s) => s.id);
	const currResultIdx = allIds.indexOf(window.currItem.id);
	if (currResultIdx < allIds.length - 1) {
		const nextResult = window.searchResults[currResultIdx + 1];
		renderSearchResult(nextResult);
	}
	checkAndDisableNavButtons(window.currItem);
}

function handlePrev() {
	const allIds = window.searchResults.map((s) => s.id);
	const currResultIdx = allIds.indexOf(window.currItem.id);
	if (currResultIdx > 0) {
		const prevResult = window.searchResults[currResultIdx - 1];
		renderSearchResult(prevResult);
	}
	checkAndDisableNavButtons(window.currItem);
}

window.searchResults = data.resume;
window.currItem = data.resume[0];
renderSearchResult(data.resume[0]);

window.addEventListener('load', () => {

	const prevButton = document.getElementById('prev-btn');
	const nextButton = document.getElementById('next-btn');

	const allIds = window.searchResults.map((s) => s.id);
	const currResultIdx = allIds.indexOf(window.currItem.id);

	// Hide "Prev" button by default if it's the first application
	if (currResultIdx === 0) {
		prevButton.style.visibility = 'hidden';
	} else {
		prevButton.style.visibility = 'visible';
	}

	// Show "Next" button if not at the last result
	if (currResultIdx < allIds.length - 1) {
		nextButton.style.visibility = 'visible';
	} else {
		nextButton.style.visibility = 'hidden';
	}
	checkAndDisableNavButtons(currResultIdx);
});