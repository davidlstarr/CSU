<?php
/**
 * Created by PhpStorm.
 * User: dstarr
 * Date: 7/5/17
 * Time: 7:18 PM
 */
require_once(__DIR__ . '/cache_buster.php');
?>
<!--Plugins-->
<!--<script src="_js/jquery.js<?php /*echo $cache_buster_version*/?>"></script>
<script src="_js/plugins.js<?php /*echo $cache_buster_version*/?>" defer></script>-->
<script src="/_js/script.min.js<?php echo $cache_buster_version; ?>" defer></script>
<!--Template functions-->
<!--<script src="_js/functions.js<?php /*echo $cache_buster_version*/?>" defer></script>-->

<!--<script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.12'><\/script>".replace("HOST", location.hostname));
    //]]></script>-->

