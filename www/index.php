<!DOCTYPE html>
<html lang="en">
<head>

	<meta charset="utf-8">
	<title>Sagnagrunnur</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400italic,700" rel="stylesheet" type="text/css">

	<link rel="stylesheet" href="css/style.css">

</head>
<body>

<div id="appView"></div>

<?php

include "templates/app.php";
include "templates/legendList.php";
include "templates/legendListView.php";
include "templates/placeList.php";
include "templates/placeListView.php";
include "templates/personList.php";
include "templates/personListView.php";
include "templates/keywordList.php";
include "templates/keywordListView.php";
include "templates/relationView.php";
include "templates/placeView.php";
include "templates/personView.php";
include "templates/legendView.php";
include "templates/taleView.php";
include "templates/manuscriptView.php";
include "templates/mapView.php";
include "templates/lettersListView.php";
include "templates/lettersList.php";
include "templates/letterView.php";

?>

<script src="js/app.min.js"></script>


	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-43853748-1', 'sagnagrunnur.com');
	  ga('send', 'pageview');
	
	</script>

</body>
</html>
