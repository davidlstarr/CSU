<?php
$page_id = "about-page";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <?php include(__DIR__ . '/head.php'); ?>
</head>

<body id="<?php echo $page_id ?>">

<!-- Wrapper -->
<div id="wrapper">

    <!-- Header -->
    <?php include(__DIR__ . '/header.php'); ?>
    <!-- end: Header -->


    <!-- Inspiro Slider -->
    <div id="slider" class="inspiro-slider arrows-large arrows-creative dots-creative" data-height-xs="360">
        <!-- Slide 2 -->
        <div class="slide background-overlay-dark kenburns" style="background-image:url('_img/portfolio/IMG_0350.JPG);">
            <div class="container">
                <div class="slide-captions text-center text-light">
                    <!-- Captions -->
                    <span class="strong">Who we are</span>
                    <h1>About our services</h1>
                    <!-- end: Captions -->
                </div>
            </div>
        </div>
        <!-- end: Slide 2 -->

    </div>
    <!--end: Inspiro Slider -->

    <section>
        <div class="container">
            <div class="heading heading-center">
                <h2>What we do</h2>
                <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor cursumus.</p>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-building"></i></a>
                        </div>
                        <h3>Apartments</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-briefcase"></i></a>
                        </div>
                        <h3>Office</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-graduation-cap"></i></a>
                        </div>
                        <h3>Educational</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-industry"></i></a>
                        </div>
                        <h3>Industrial</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-medkit"></i></a>
                        </div>
                        <h3>Medical</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="icon-box effect medium border center">
                        <div class="icon">
                            <a href="#"><i class="fa fa-bed"></i></a>
                        </div>
                        <h3>Hotels</h3>
                        <p>Lorem ipsum dolor sit amet, consecte adipiscing elit. Suspendisse condimentum porttitor
                            cursumus.</p>
                    </div>
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
