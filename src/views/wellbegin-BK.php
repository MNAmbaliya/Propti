<?php
/* Template Name: well-being  */
get_header();
?>
<style>
.sulution-btn-wrapper1 {
    text-align: center;
    margin-top: 100px;
}

.circle-one1 {
    background: #fff;
    width: 118px;
    border-radius: 100%;
    height: 118px;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    padding: 14px 27px;
}

.sulution-btn-wrapper1 a {
    font-weight: normal;
    font-size: 16px;
    letter-spacing: 0.03em;
    line-height: 18px;
    text-align: center;
    color: #3f4944;
    flex-wrap: wrap;
}

.sulution-btn-wrapper1 i {
    font-size: 26px;
    color: #000;
}

.circle-two1 {
    background: #8BDDCA;
    width: 90px;
    height: 90px;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    padding: 15px;
}

.circle-two1 a {
    color: #fff;
}

.circle-two1 div {
    text-align: left;
}

.circle-two1 i {
    padding-left: 8px;
}

/* .sulution-btn-wrapper1 .circle-one1 {
    margin-right: 20px;
} */

/*Buttons animation*/
div#letsgetyoucovered {
    position: relative;
}
div#letgetyoucoveredbuttonwhite {
    position: relative;
}
</style> 
<section id="hero">
    <div class="container">
        <div class="row" id="wellbeing">
				<div class="col-lg-12 text-center">
					<div class="hero-title">
						<p class="hero-texta"><?php the_field('about_sub_title'); ?></p>
						<h1><?php the_field('being_title'); ?></h1>
						<p class="hero-txt"><?php the_field('being_text'); ?></p>
                        
					</div>
					<div class="hero-text">
						<h2><?php the_field('being_sub_title'); ?></h2>
					</div>
                      <div class="text-center hero_img">
                        <a href="#" class="btn btn-theme" >Let’s get you covered</a>
                      </div>
				</div>
				<div class="col-lg-12 btn-btm-more text-center half-circle">
                    <div class="more-link-wrapper">
                        <div class="circle-white"><svg xmlns="http://www.w3.org/2000/svg" width="183.001" height="183" viewBox="0 0 183.001 183"><path id="Subtraction_1" data-name="Subtraction 1" d="M-777.5,1168.909a90.928,90.928,0,0,1-35.616-7.19,91.509,91.509,0,0,1-15.543-8.436A92.171,92.171,0,0,1-842.2,1142.11a92.159,92.159,0,0,1-11.173-13.542,91.514,91.514,0,0,1-8.436-15.543A90.926,90.926,0,0,1-869,1077.41a90.927,90.927,0,0,1,7.19-35.616,91.512,91.512,0,0,1,8.436-15.543,92.161,92.161,0,0,1,11.173-13.542,92.161,92.161,0,0,1,13.542-11.173,91.505,91.505,0,0,1,15.543-8.436,90.926,90.926,0,0,1,35.616-7.191,90.926,90.926,0,0,1,35.616,7.191,91.5,91.5,0,0,1,15.543,8.436,92.164,92.164,0,0,1,13.542,11.173,92.167,92.167,0,0,1,11.173,13.542,91.515,91.515,0,0,1,8.436,15.543A90.927,90.927,0,0,1-686,1077.41a90.925,90.925,0,0,1-7.191,35.616,91.5,91.5,0,0,1-8.436,15.543A92.168,92.168,0,0,1-712.8,1142.11a92.177,92.177,0,0,1-13.542,11.173,91.514,91.514,0,0,1-15.543,8.436A90.928,90.928,0,0,1-777.5,1168.909Zm0-143a51.558,51.558,0,0,0-51.5,51.5,51.558,51.558,0,0,0,51.5,51.5,51.558,51.558,0,0,0,51.5-51.5A51.558,51.558,0,0,0-777.5,1025.91Z" transform="translate(869 -985.909)" fill="#fff"/></svg>
                        </div>
                        <a href="#about" class="btm-link-more">More</a>
                    </div>
                </div>
		</div>
	</div>
</section>
<section id="about" class="about">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
<?php the_field('being_content'); ?>
          </div>
        </div>
      </div>
</section>
<section id="why-us" class="why-us section-bg">
      <div class="container">

        <div class="row">
<?php
while( have_rows('being_team') ){ the_row();
?>
          <div class="col-lg-4 col-md-6 d-flex text-center">
            <div class="card">
              <img src=" <?php the_sub_field('image'); ?>" class="card-img-top" alt="..."> 
			
              <div class="card-body">
                <h5 class="card-title"><a href=""><?php the_sub_field('team_title'); ?></a></h5>
                <p class="card-text"><?php the_sub_field('team_text'); ?></p>
              </div>
            </div>
          </div>
<?php
}
?>
        </div>

      </div>
</section>
<section id="portfolio" class="portfolio">

      <div class="container aos-init aos-animate" data-aos="fade-up">

        <div class="section-header text-center">
          <h2><?php the_field('insight_title'); ?></h2>
          <p><?php the_field('insight_paragraph'); ?></p>
          <p class="blog-cat"><?php the_field('blog_categories'); ?></p>
        </div>
		<p><?php echo do_shortcode('[caf_filter id="112"]'); ?></p>
        <div class="text-center">
            <a href="<?php echo get_site_url() ?>/services/" class="btn btn-theme">View</a>
        </div>
        <div class="sulution-btn-wrapper1 text-center">
                    <div class="sulution-btn-wrapper">
                        <!-- <a class="" href="#">Let's get you covered <i class="fas fa-arrow-up"></i></a> -->
                        <a href="<?php echo get_site_url() ?>/contact/" id="letgetyoucoveredbuttonwhite" class="circle-one1 d-inline-flex"></a>

                       <!--  <a class="circle-two1 d-inline-flex" href="#">Our vision<i class="fas fa-arrow-right"></i></a> -->
                        <!-- <a href="<?php echo get_site_url() ?>/our-vision/" id="ourvisionbuttongreen" class="circle-two1 d-inline-flex"></a> -->
                    </div>
        </div>
      </div>

</section>
 
  
<?php get_footer(); ?>

<script>
	
    var green_one_squares = document.getElementById("letgetyoucoveredbuttonwhite");
    var green_one_animation = bodymovin.loadAnimation({
        container: green_one_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttonwhite.json"
    });
    
    
    jQuery(green_one_squares).mouseenter(function(){
        green_one_animation.setDirection(0);
        green_one_animation.play();
    });
    jQuery(green_one_squares).mouseleave(function(){
        green_one_animation.setDirection(-1);
        green_one_animation.goToAndPlay();
    });

	
    // ------------------------------------------------------------------
    var rama_one_squares = document.getElementById("ourvisionbuttongreen");
    var rama_one_animation = bodymovin.loadAnimation({
        container: rama_one_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen.json"
    });
    
    jQuery(rama_one_squares).mouseenter(function(){
        rama_one_animation.setDirection(0);
        rama_one_animation.play();
    });
    jQuery(rama_one_squares).mouseleave(function(){
        rama_one_animation.setDirection(-1);
        rama_one_animation.goToAndPlay();
    });
</script>