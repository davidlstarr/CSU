<?php
$page_id = "about-page";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include(__DIR__ . '/head.php'); ?>
</head>

<body id="<?php echo $page_id?>">

<!-- Wrapper -->
<div id="wrapper">

    <!-- Header -->
    <?php include(__DIR__ . '/header.php'); ?>
    <!-- end: Header -->


    <!-- Inspiro Slider -->
    <div id="slider" class="inspiro-slider arrows-large arrows-creative dots-creative" data-height-xs="360">
        <!-- Slide 2 -->
        <div class="slide background-overlay-dark kenburns" style="background-image:url('_img/IMG_0943.JPG);">
            <div class="container">
                <div class="slide-captions text-center text-light">
                    <!-- Captions -->
                    <span class="strong">Who we are</span>
                    <h1>About our company</h1>
                    <!-- end: Captions -->
                </div>
            </div>
        </div>
        <!-- end: Slide 2 -->

    </div>
    <!--end: Inspiro Slider -->

    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="heading heading text-left">
                        <h2>OUR COMPANY PROFILE</h2>

                    </div>
                </div>
                <div class="col-md-9">
                    <div class="col-md-6">Established in 1981, Master Maintenance is a professional facility maintenance company that provides quality building services
                        to commercial and industrial businesses in Ohio, Kentucky, and Indiana. We pride ourselves in providing the most professional service in the industry.<br><br>
                        Master Maintenance is a professional janitorial and building service company dedicated to meeting the needs of its customer as identified in the work specifications. We provide services to commercial, industrial, and institutional clients who value the importance of a clean environment.<br><br>
                        The most vital component of its company is the people. Through proper selection, training, fair compensation, and respect, we are committed to developing a highly motivated work team.<br><br>
                    </div>

                    <div class="col-md-6">

                        We believe that by providing quality building services through our professional work team, we create a partnership that relieves the customer of responsibilities not primary to their business goals, allows our company to succeed and grow, and helps our work team to achieve both business and personal goals.<br><br>

                        Integrity in our people, in our actions, and in our relationships with others, is the foundation that makes us the most innovative and professional company in the industry.<br><br>
                        <i>Developing People and Partnerships Since 1981</i>
                    </div>

                </div>
                <div class="col-md-3">
                    <div class="heading heading text-left">
                    </div>
                </div>
                <div class="col-md-9 about-description">
                    <div class="col-md-12">Master Maintenance has been a <a href="http://www.bbb.org/lima/business-reviews/janitor-service/nicholas-d-starr-in-lima-oh-1481">BBB Accredited Business</a> since December 18, 1996.</div>
                    <br>
                    <br>
                    <a href="http://www.bbb.org/lima/business-reviews/janitor-service/nicholas-d-starr-in-lima-oh-1481"><img width="10%" src="./_img/bbb.png" alt="BBB Accredited Business"></a>

                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <?php include(__DIR__ . '/footer.php'); ?>
    <!-- end: Footer -->

</div>
<!-- end: Wrapper -->

<!-- Go to top button -->
<a id="goToTop"><i class="fa fa-angle-up top-icon"></i><i class="fa fa-angle-up"></i></a>
<?php include(__DIR__ . '/bottom_scripts.php'); ?>
</body>

</html>
