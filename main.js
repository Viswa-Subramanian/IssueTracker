document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// a save issue format to get the issue and store the contents under appropriate variables under unsolved catagory
function saveIssue(e) 
{
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'UnSolved';
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  // if there is no issue description push the issue with no content
  if(localStorage.getItem('issues') == null) 
  {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } 

  // if issue is fully described put the issue along with the contents mentioned
  else 
  {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  // reset the form eachtime after adding an issue to make space to add new issue
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

// function to change the status when the issue is handled and marked as canceled 
function setStatusClosed(id) 
{
  var issues = JSON.parse(localStorage.getItem('issues'));
  for (var i = 0; i < issues.length; i++) 
  {
    if (issues[i].id == id) {
      issues[i].status = 'Solved';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// function to delete the issue from the issue tracker once when marked deleted
function deleteIssue(id) 
{
  var issues = JSON.parse(localStorage.getItem('issues'));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

// function to get the issues as an input and display them in descending order
function fetchIssues() 
{
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  for (var i = 0; i < issues.length; i++) 
  {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h3><small>Issue ID: ' + id + '</small></h3>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><i class="far fa-clock"></i> ' + severity + '</p>'+
                              '<p><i class="far fa-user"></i> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning" style="background-color: rgba(0, 0, 255, 0.673);border: blue;">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger" style="background-color: rgb(243, 54, 92, 0.873);border: crimson;">Delete</a>'+
                              '</div>';
  }
}