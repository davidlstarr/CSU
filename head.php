<?php
/**
 * Created by PhpStorm.
 * User: dstarr
 * Date: 7/5/17
 * Time: 7:11 PM
 */
require_once(__DIR__ . '/local_or_live.php');
require_once(__DIR__ . '/cache_buster.php');
?>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta name="author" content="Master Maintenance" />
<meta name="description" content="Cleaning Services Unlimited is the most well-known, trusted name in cleaning services. If you're looking for a detailed cleaning service, you've come to the right place! We put together packages based on your specific cleaning preferences, schedule and budget. Cleaning Services Unlimited provides the best industrial cleaning and janitorial services to large or small facilities.">
<!-- Document title -->
<title>Cleaning Services Unlimited</title>
<!-- Stylesheets & Fonts -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,800,700,600|Montserrat:400,500,600,700|Raleway:100,300,600,700,800" rel="stylesheet" type="text/css" />
<!--<link href="css/plugins.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/responsive.css" rel="stylesheet">-->

<!-- Primary CSS -->
<?php if ($local == true) {
    echo "<link rel=\"stylesheet\" type=\"text/css\" media=\"screen, projection\" href=\"_css/styles.css" . $cache_buster_version . "\">\n";
}else{
    echo "<link rel=\"stylesheet\" type=\"text/css\" media=\"screen, projection\" href=\"_css/styles.min.css" . $cache_buster_version . "\">\n";
}?>
<?php include(__DIR__ . '/analytics_tracking.php');?>