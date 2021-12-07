<?php
/* Template Name: front page*/
get_header();

?>
<style>
    #voip-svg-running, #compliance{
        width: 200px;
        height: 200px;
    }
</style>
<section class="it-section">
    <div class="bg-img-set">
        <img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/Group-385.png" class="img-fluid" alt="slider-icon">
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="it-hero-slider owl-carousel owl-theme">
                    
                    <div class="item">
                        <div class="d-center-hero">
                            <div>
                                <ul class="list-protect">
                                    <li>Protect</li>
                                    <li>Secure</li>
                                    <li>Support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div class="business-slide">
                                <h1>Business Goals Aligned</h1>
                                <p><img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/hero-icon.png" class="img-fluid" alt="hero-icon">IT strategy mapped to your vision</p>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div class="it-supportslide">
                                <h1>IT supported</h1>
                                <p><img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/hero-icon.png" class="img-fluid" alt="hero-icon">Business IT Support with cyber protection built in</p>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div class="disast-slide">
                                <h1>Disasters Recovered</h1>
                                <p><img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/hero-icon.png" class="img-fluid" alt="hero-icon">Downtime from disasters measured in minutes instead of hours</p>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div class="telephone-s">
                                <h1>Telephone Systems Hosted</h1>
                                <p><img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/hero-icon.png" class="img-fluid" alt="hero-icon">Your phone anywhere and on any device</p>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div class="it-slide">
                                <h1>IT secured <br>& compliant</h1>
                                <p><img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/hero-icon.png" class="img-fluid" alt="hero-icon">Our clients become Cyber Essentials certified</p>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="d-center-hero">
                            <div>
                            </div>
                        </div>
                    </div>
                </div>                    
            </div>
        </div>
    </div>
    <div class="btn-btm-more text-center half-circle">
        <div class="more-link-wrapper">
            <div class="circle-white"><svg xmlns="http://www.w3.org/2000/svg" width="183.001" height="183" viewBox="0 0 183.001 183"><path id="Subtraction_1" data-name="Subtraction 1" d="M-777.5,1168.909a90.928,90.928,0,0,1-35.616-7.19,91.509,91.509,0,0,1-15.543-8.436A92.171,92.171,0,0,1-842.2,1142.11a92.159,92.159,0,0,1-11.173-13.542,91.514,91.514,0,0,1-8.436-15.543A90.926,90.926,0,0,1-869,1077.41a90.927,90.927,0,0,1,7.19-35.616,91.512,91.512,0,0,1,8.436-15.543,92.161,92.161,0,0,1,11.173-13.542,92.161,92.161,0,0,1,13.542-11.173,91.505,91.505,0,0,1,15.543-8.436,90.926,90.926,0,0,1,35.616-7.191,90.926,90.926,0,0,1,35.616,7.191,91.5,91.5,0,0,1,15.543,8.436,92.164,92.164,0,0,1,13.542,11.173,92.167,92.167,0,0,1,11.173,13.542,91.515,91.515,0,0,1,8.436,15.543A90.927,90.927,0,0,1-686,1077.41a90.925,90.925,0,0,1-7.191,35.616,91.5,91.5,0,0,1-8.436,15.543A92.168,92.168,0,0,1-712.8,1142.11a92.177,92.177,0,0,1-13.542,11.173,91.514,91.514,0,0,1-15.543,8.436A90.928,90.928,0,0,1-777.5,1168.909Zm0-143a51.558,51.558,0,0,0-51.5,51.5,51.558,51.558,0,0,0,51.5,51.5,51.558,51.558,0,0,0,51.5-51.5A51.558,51.558,0,0,0-777.5,1025.91Z" transform="translate(869 -985.909)" fill="#fff"/></svg>
            </div>
            <a href="#itsupport" class="btm-link-more">More</a>
        </div>
    </div>
</section>

<section class="it-support" id="itsupport">
    <div class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <div class="it-title">
                    <h2><?php the_field('supported'); ?></h2>
                    <p><?php the_field('support_text'); ?></p>
                    <ul class="list-it p-0">
                        <li>
                            <h3><a href="#disaterSec"><?php the_field('disasters'); ?></a></h3>
                            <p>Disaster recovery solutions to get you up and running fast.</p>
                            <a href="#disaterSec" class="list-link">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21.614" height="21.743" viewBox="0 0 21.614 21.743"><g id="Group_470" data-name="Group 470" transform="translate(-34.133 -156.671)"><path id="Path_36" data-name="Path 36" d="M493.082,1903.561a6.093,6.093,0,0,1,6,5.058h4.805a10.855,10.855,0,0,0-21.614,0h4.805A6.094,6.094,0,0,1,493.082,1903.561Z" transform="translate(-448.142 -1742.115)" fill="#00FFFF"/><path id="Path_244" data-name="Path 244" d="M499.1,1940.345a6.094,6.094,0,0,1-11.908,0h-4.828a10.856,10.856,0,0,0,21.564,0Z" transform="translate(-448.204 -1771.52)" fill="#00FFFF"/></g></svg>
                                <span>more</span>
                            </a>
                        </li>
                    </ul>
                    <div class="theme-link">
                        <?php
                            $packaged_solutions = get_field( 'packaged_solutions' );
                        ?>
                        <a href="<?php echo get_site_url(); ?>/pricing/" class="theme-short"><?php echo $packaged_solutions['text']; ?></a>
                        <div class="right-arrow">
                            <!-- <svg class="line-arr" width="25" height="8" viewBox="0 0 39 2" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                <path d="M1 1L38 1" stroke="#65fdff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>-->
                            <svg class="line-arr" xmlns="http://www.w3.org/2000/svg" width="40" height="4" viewBox="0 0 20 4" fill="none">
                            <path d="M2 2L18 2" stroke="black" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" style="
                                stroke: #65fdff;
                            "></path>
                            </svg>
                            <svg class="angle-arr" width="30" height="30" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.999999L8 8L1 15" stroke="#65fdff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                         <!-- <div id="right-arrow-home"></div> -->
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <ul class="list-it">
                    <!-- <li>
                        <h3><a href="#disaterSec"><?php //the_field('disasters'); ?></a></h3>
                        <a href="#disaterSec" class="list-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.614" height="21.743" viewBox="0 0 21.614 21.743"><g id="Group_470" data-name="Group 470" transform="translate(-34.133 -156.671)"><path id="Path_36" data-name="Path 36" d="M493.082,1903.561a6.093,6.093,0,0,1,6,5.058h4.805a10.855,10.855,0,0,0-21.614,0h4.805A6.094,6.094,0,0,1,493.082,1903.561Z" transform="translate(-448.142 -1742.115)" fill="#00FFFF"/><path id="Path_244" data-name="Path 244" d="M499.1,1940.345a6.094,6.094,0,0,1-11.908,0h-4.828a10.856,10.856,0,0,0,21.564,0Z" transform="translate(-448.204 -1771.52)" fill="#00FFFF"/></g></svg>
                            <span>more</span>
                        </a>
                    </li> -->
                    <li>
                        <h3><a href="#ComplianceSec"><?php the_field('it_secured'); ?></a></h3>
                        <p>Assisting our clients on the Cyber Essentials standards and framework.</p>
                        <a href="#ComplianceSec" class="list-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.614" height="21.743" viewBox="0 0 21.614 21.743"><g id="Group_470" data-name="Group 470" transform="translate(-34.133 -156.671)"><path id="Path_36" data-name="Path 36" d="M493.082,1903.561a6.093,6.093,0,0,1,6,5.058h4.805a10.855,10.855,0,0,0-21.614,0h4.805A6.094,6.094,0,0,1,493.082,1903.561Z" transform="translate(-448.142 -1742.115)" fill="#DCEEB5"/><path id="Path_244" data-name="Path 244" d="M499.1,1940.345a6.094,6.094,0,0,1-11.908,0h-4.828a10.856,10.856,0,0,0,21.564,0Z" transform="translate(-448.204 -1771.52)" fill="#DCEEB5"/></g></svg>
                            <span>more</span>
                        </a>
                    </li>
                    <li>
                        <h3><a href="#hostedTel"><?php the_field('telephone'); ?></a></h3>
                        <p>VOIP solutions - be available anywhere for a fraction of the costs.</p>
                        <a href="#hostedTel" class="list-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21.614" height="21.743" viewBox="0 0 21.614 21.743"><g id="Group_470" data-name="Group 470" transform="translate(-34.133 -156.671)"><path id="Path_36" data-name="Path 36" d="M493.082,1903.561a6.093,6.093,0,0,1,6,5.058h4.805a10.855,10.855,0,0,0-21.614,0h4.805A6.094,6.094,0,0,1,493.082,1903.561Z" transform="translate(-448.142 -1742.115)" fill="#659387"/><path id="Path_244" data-name="Path 244" d="M499.1,1940.345a6.094,6.094,0,0,1-11.908,0h-4.828a10.856,10.856,0,0,0,21.564,0Z" transform="translate(-448.204 -1771.52)" fill="#659387"/></g></svg>
                            <span>more</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-md-4">
                <div class="solutions-wrapp">
                    <img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/circle-bg.png" class="img-fluid" alt="circle">
                    <h2><?php the_field('complete_solutions'); ?></h2>
                </div>
                <div class="sulution-btn-wrapper">
                    <!-- <a class="circle-one d-inline-flex" href="#">Let's get you covered <i class="fas fa-arrow-up"></i></a> -->
                    <a href="<?php echo get_site_url() ?>/contact" id="green-btn-hover" class="circle-one d-inline-flex"></a>
                    <!-- <a class="circle-two d-inline-flex" href="#">Our vision<i class="fas fa-arrow-right"></i></a> -->
                    <a href="<?php echo get_site_url() ?>/our-vision" id="rama-btn" class="circle-two d-inline-flex"></a>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="border-hight-dark"></div>
<div class="border-hight-light"></div>



<section class="it-secure">
	<div class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <h2 class="s-title">IT Supported</h2>
                <p class="rec-text">IT support aligned to your business goals and vision. We manage all aspects of your IT network and systems. Our friendly approach and focus on keeping your data safe is our priority.</p>
                <div class="sulution-btn-wrapper recovery-btn">
                    <a href="<?php echo get_site_url() ?>/contact" id="white-btn1" class="circle-one d-inline-flex"></a>
                    <a href="<?php echo get_site_url() ?>/our-vision" id="green-ov-btn-secure" class="circle-two d-inline-flex"></a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="up-running-circle">
                    <div id="voip-svg-running" class="svg-running">
                    </div>
                    <h4 class="running-text"><span> Secure</span></h4>
                </div>
                <div class="pack-text">
                	<h6>Our Unlimited IT Support starts at £35 per machine per month.</h6>
                	<h6>We offer additional security packages for the total IT Wellbeing for your business.</h6>
                	<p>All our support packages include:</p>
                	<ul class="pack-list">
                		<li>Unlimited Remote Support (UK Business Hours)</li>
                		<li>Security Patching and Updates</li>
                		<li>Antivirus</li>
                		<li>Dedicated Account Manager</li>
                		<li>Regular IT Manager meetings</li>
                	</ul>
                </div>
            </div>
            <div class="col-md-4">
               <div class="img-circle text-center">
               		<img src="/wp-content/uploads/2021/10/Picture1.jpg" class="img-fluid rounded-circle" alt="image">
               </div>
                <div class="it-support-card">
                    <h2><?php the_field('it_supported_sub_title'); ?></h2>
                    <div class="theme-link">
                        <a href="<?php echo get_site_url(); ?>/pricing/" class="theme-short"><?php the_field('it_supported_btn'); ?></a>
                        <div class="right-arrow">
                            <svg class="line-arr" xmlns="http://www.w3.org/2000/svg" width="40" height="4" viewBox="0 0 20 4" fill="none">
                            <path d="M2 2L18 2" stroke="black" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" style="
                                stroke: #65fdff;
                            "></path>
                            </svg>
                            <svg class="angle-arr" width="30" height="30" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.999999L8 8L1 15" stroke="#65fdff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="recovery-section" id="disaterSec">
    <div  class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <h2 class="s-title"><?php the_field('disaster_title'); ?></h2>
                <p class="rec-text"><?php the_field('disaster_text'); ?></p>
                <div class="sulution-btn-wrapper recovery-btn">
                    <a href="<?php echo get_site_url() ?>/contact" id="green-btn-one" class="circle-one d-inline-flex">

                    </a>
                    <!-- <a class="circle-two d-inline-flex" href="#">Our vision<i class="fas fa-arrow-right"></i></a> -->
                    <a href="<?php echo get_site_url() ?>/our-vision/" id="rama-btn-two" class="circle-two d-inline-flex">

                    </a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="up-running-circle">
                    <div id="round-svg-running" class="svg-running">
                        <!-- <svg id="Group_481" data-name="Group 481" xmlns="http://www.w3.org/2000/svg" width="124" height="131.253" viewBox="0 0 124 131.253">
                          <g id="Group_69" data-name="Group 69" transform="translate(0 83.556)">
                            <g id="Group_68" data-name="Group 68" transform="translate(0)">
                              <path id="Path_48" data-name="Path 48" d="M835.428,4354.932h13.934a50.823,50.823,0,0,0,96.131,0h13.934a64.149,64.149,0,0,1-124,0Z" transform="translate(-835.428 -4354.932)" fill="#8bddca"/>
                            </g>
                          </g>
                          <g id="Group_415" data-name="Group 415">
                            <g id="Group_68-2" data-name="Group 68" transform="translate(0)">
                              <path id="Path_48-2" data-name="Path 48" d="M835.428,4402.629h13.934a50.823,50.823,0,0,1,96.131,0h13.934a64.149,64.149,0,0,0-124,0Z" transform="translate(-835.428 -4354.933)" fill="aqua"/>
                            </g>
                          </g>
                        </svg> -->

                    </div>
                    <h4 class="running-text"><?php the_field('running'); ?></h4>
                </div>
                <?php the_field('disaster_list'); ?>
                
            </div>
            <div class="col-md-4">
                <div class="video-play">
                    <!-- <a href="#">
                        <img src="<?php echo get_site_url(); ?>/wp-content/uploads/2021/07/play.png" alt="play" class="img-fluid">
                    </a> -->
                </div>
                <div class="part-team">
                    <?php the_field('part_btn'); ?>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="itCompliance-section" id="ComplianceSec">
    <div class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <h2 class="s-title"><?php the_field('it_security_title'); ?></h2>
                <p class="rec-text"><?php the_field('it_security_text'); ?></p>
                <div class="sulution-btn-wrapper recovery-btn">
                    <!-- <a class="circle-one d-inline-flex bg-white" href="#">Let’s get you covered<i class="fas fa-arrow-up"></i></a> -->
                    <a href="<?php echo get_site_url() ?>/contact" id="white-btn" class="circle-one d-inline-flex"></a>
                    <a href="<?php echo get_site_url() ?>/our-vision" id="green-ov-btn" class="circle-two d-inline-flex"></a>
                    <!-- <a class="circle-two d-inline-flex" href="#">Our vision<i class="fas fa-arrow-right"></i></a> -->
                </div>
            </div>
            <div class="col-md-4">                
                <div class="up-running-circle">
                    <div id="compliance"></div>
                    <!-- <div class="svg-running">
                        <svg xmlns="http://www.w3.org/2000/svg" width="168.29" height="101.625" viewBox="0 0 168.29 101.625">
                          <g id="Group_63" data-name="Group 63">
                            <g id="Group_62" data-name="Group 62" transform="translate(0 0)">
                              <path id="Path_46" data-name="Path 46" d="M835.428,4294.34h9.753a35.572,35.572,0,0,1,67.283,0h9.753a44.9,44.9,0,0,0-86.789,0Z" transform="translate(-835.428 -4260.957)" fill="aqua"/>
                            </g>
                          </g>
                          <g id="Group_413" data-name="Group 413" transform="translate(81.501 68.241)">
                            <g id="Group_68" data-name="Group 68" transform="translate(0)">
                              <path id="Path_48" data-name="Path 48" d="M835.428,4354.932h9.753a35.572,35.572,0,0,0,67.283,0h9.753a44.9,44.9,0,0,1-86.789,0Z" transform="translate(-835.428 -4354.932)" fill="#8bddca"/>
                            </g>
                          </g>
                        </svg>
                    </div> -->
                    <h4 class="running-text"><span><?php the_field('compliance'); ?></span></h4>
                </div>
                <?php the_field('it_security_list'); ?>
                
            </div>
            <div class="col-md-4">
                <div class="card-slider">
                    <div class="test-slider owl-carousel owl-theme">
                        <?php
                        while (have_rows('security_review'))
                        {
                            the_row();
                        ?>
                        <div class="item">
                            <div class="card-text">
                                <p class="tes-quots"><?php the_sub_field('security_review_text'); ?></p>
                                <p class="c-sol-txt"><?php the_sub_field('security_review_name'); ?></p>
                                <p class="c-comp"><?php the_sub_field('security_review_sub_name'); ?></p>
                            </div>
                        </div>                        
                        <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="hosted-section" id="hostedTel">
    <div class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <h2 class="s-title"><?php the_field('hosted_title'); ?></h2>
                <p class="rec-text"><?php the_field('hosted_text'); ?></p>
                <div class="sulution-btn-wrapper recovery-btn">
                    <!-- <a class="circle-one d-inline-flex" href="#">Let’s get you covered<i class="fas fa-arrow-up"></i></a> -->
                    <!-- <a class="circle-two d-inline-flex" href="#">Our vision<i class="fas fa-arrow-right"></i></a> -->
                    <a href="<?php echo get_site_url() ?>/contact" id="green-btn-three" class="circle-one d-inline-flex"></a>
                    <a href="<?php echo get_site_url() ?>/our-vision" id="rama-btn-four" class="circle-two d-inline-flex"></a>
                </div>
            </div>
            <div class="col-md-4">                
                <div class="up-running-circle">
                    <div id="voip-svg-running" class="svg-running">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="103.355" height="96.327" viewBox="0 0 103.355 96.327">
                          <g id="Group_482" data-name="Group 482" transform="translate(-789.426 -1171.856)">
                            <g id="Group_416" data-name="Group 416" transform="translate(789.426 1171.856)">
                              <g id="Group_68" data-name="Group 68" transform="translate(0)">
                                <path id="Path_48" data-name="Path 48" d="M835.428,4394.689h11.614a42.361,42.361,0,0,1,80.126,0h11.615a53.468,53.468,0,0,0-103.355,0Z" transform="translate(-835.428 -4354.933)" fill="#8bddca"/>
                              </g>
                            </g>
                            <g id="Group_417" data-name="Group 417" transform="translate(808.814 1188.946)">
                              <g id="Group_68-2" data-name="Group 68" transform="translate(0)">
                                <path id="Path_48-2" data-name="Path 48" d="M835.428,4379.773h7.257a26.468,26.468,0,0,1,50.064,0h7.257a33.408,33.408,0,0,0-64.578,0Z" transform="translate(-835.428 -4354.933)" fill="#8bddca"/>
                              </g>
                            </g>
                            <g id="Group_418" data-name="Group 418" transform="translate(822.252 1203.747)">
                              <g id="Group_68-3" data-name="Group 68" transform="translate(0)">
                                <path id="Path_48-3" data-name="Path 48" d="M835.428,4369.435h4.237a15.453,15.453,0,0,1,29.229,0h4.237a19.5,19.5,0,0,0-37.7,0Z" transform="translate(-835.428 -4354.933)" fill="#8bddca"/>
                              </g>
                            </g>
                            <g id="Group_413" data-name="Group 413" transform="translate(809.061 1243.449)">
                              <g id="Group_68-4" data-name="Group 68" transform="translate(0)">
                                <path id="Path_48-4" data-name="Path 48" d="M835.428,4354.932h7.226a26.355,26.355,0,0,0,49.85,0h7.226a33.265,33.265,0,0,1-64.3,0Z" transform="translate(-835.428 -4354.932)" fill="aqua"/>
                              </g>
                            </g>
                          </g>
                        </svg> -->

                    </div>
                    <h4 class="running-text"><span><?php the_field('voip_systems'); ?></span></h4>
                </div>
                <?php the_field('hosted_list'); ?>
            </div>
            <div class="col-md-4">
                <div class="it-BT">
                    <h2><?php the_field('hosted_sub_title'); ?></h2>
                    <h3><?php the_field('hosted_off'); ?></h3>
                </div>
                <div class="it-support-card">
                    <h2><?php the_field('it_supported_sub_title'); ?></h2>
                    <div class="theme-link">
                        <a href="<?php echo get_site_url(); ?>/pricing/" class="theme-short"><?php the_field('it_supported_btn'); ?></a>
                        <div class="right-arrow">
                            <!-- <svg class="line-arr" width="25" height="8" viewBox="0 0 39 2" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                                <path d="M1 1L38 1" stroke="#65fdff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>-->
                            <svg class="line-arr" xmlns="http://www.w3.org/2000/svg" width="40" height="4" viewBox="0 0 20 4" fill="none">
                            <path d="M2 2L18 2" stroke="black" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" style="
                                stroke: #65fdff;
                            "></path>
                            </svg>
                            <svg class="angle-arr" width="30" height="30" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.999999L8 8L1 15" stroke="#65fdff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <!-- <i class="fas fa-arrow-right"></i> -->
                        <!-- <div id="right-arrow-home-two"></div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="protect-secure-section">
    <div class="container">
        <div class="row space-btm-md">
            <div class="col-md-4">
                <?php
                    $protect_continuation_left = get_field( 'protect__continuation_left' );
                ?>
                <h2 class="title">
                    <?php
                        echo $protect_continuation_left['continuation_title'];
                    ?>
                </h2>
                <p class="rec-text">
                    <?php
                        echo $protect_continuation_left['continuation_tect'];
                    ?>
                </p>
                <div class="user-profile">
                    <img src="<?php echo $protect_continuation_left['continuation_image']; ?>" alt="" class="user img-fluid">
                </div>
            </div>
            <div class="col-md-4 d-flex align-items-center">                
                <div class="s-middle-logo">
                    <h3><?php the_field('protect_title'); ?></h3>
                </div>
            </div>
            <div class="col-md-4">
                <?php
                    $protect_continuation_right = get_field( 'protect__continuation_right' );
                ?>
                <h2 class="title">
                    <?php
                        echo $protect_continuation_right['continuation_title'];
                    ?>
                </h2>
                <p class="rec-text">
                    <?php
                        echo $protect_continuation_right['continuation_tect'];
                    ?>
                </p>
                <div class="user-profile">
                    <img src="<?php echo $protect_continuation_right['continuation_image']; ?>" alt="" class="user img-fluid">
                </div>
            </div>
        </div>
        <div class="row space-btm-md client-logo-section">
		<?php while (have_rows('protect_image'))
		{
			the_row();
		?>
						<div class="col-md-3">
							<div class="client-logo">
									<div class="client-logo"> <img src="<?php the_sub_field('protect_image1'); ?>" class="img-fluid" alt=""> </div>
							</div>
						</div>
						<?php
		}
		?>
        </div>
        <div class="row space-btm-md btm-client-logo">
        <?php while (have_rows('protect_logo_image'))
		{
			the_row();
		?>
						<div class="col-md-3">
							<div class="client-logo">
									<div class="client-logo"> <img src="<?php the_sub_field('logo_image'); ?>" class="img-fluid" alt=""> </div>
							</div>
						</div>
						<?php
		}
		?>
        </div>
    </div>
</section>

<?php get_footer(); ?>

<script>

    /* Front page js*/

    jQuery('.test-slider').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        dots: true,
        autoHeight:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
   
    jQuery('.it-hero-slider').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 2000,
        // smartSpeed: 1000,
        mouseDrag  : false,
        touchDrag : false,
        animateOut: "slideOutUp",
        animateIn: "slideInUp",
        responsive:{
            0:{
                items:1,                
                mouseDrag  : false,

            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

    jQuery(document).ready(function(){
        let flag = 0;
        let id_val = 1;

        jQuery(".it-section .owl-item").each(function(){
            jQuery(this).attr("id","myslider_"+id_val);
            id_val++;
        });

        jQuery(".it-hero-slider .owl-dots").click(function(){
            if(flag == 0){
                jQuery(".bg-img-set img").addClass("rotetbg");
                flag=1;
            }else{
                jQuery(".bg-img-set img").removeClass("rotetbg");
                flag=0;
            }
        });

        setInterval(function(){ 
             var my_id = jQuery(".it-section .owl-stage .active").attr("id");
            var id_number = my_id.replace(/[^0-9]/g,'');
            
            if(id_number%2 == 0){
                jQuery(".bg-img-set img").addClass("rotetbg");
            }else{
                jQuery(".bg-img-set img").removeClass("rotetbg");
            }

        }, 2000);
    });
    


    var green_btn_squares = document.getElementById("green-btn-hover");
    var green_btn_animation = bodymovin.loadAnimation({
        container: green_btn_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttongreen.json"
    });
    
    
    jQuery(green_btn_squares).mouseenter(function(){
        green_btn_animation.setDirection(0);
        green_btn_animation.play();
    });
    jQuery(green_btn_squares).mouseleave(function(){
        green_btn_animation.setDirection(-1);
        green_btn_animation.goToAndPlay();
    });

    var green_two_squares = document.getElementById("green-btn-one");
    var green_two_animation = bodymovin.loadAnimation({
        container: green_two_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttongreen.json"
    });
    
    
    jQuery(green_two_squares).mouseenter(function(){
        green_two_animation.setDirection(0);
        green_two_animation.play();
    });
    jQuery(green_two_squares).mouseleave(function(){
        green_two_animation.setDirection(-1);
        green_two_animation.goToAndPlay();
    });

    // three
    var green_three_squares = document.getElementById("green-btn-three");
    var green_three_animation = bodymovin.loadAnimation({
        container: green_three_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttongreen.json"
    });
    
    
    jQuery(green_three_squares).mouseenter(function(){
        green_three_animation.setDirection(0);
        green_three_animation.play();
    });
    jQuery(green_three_squares).mouseleave(function(){
        green_three_animation.setDirection(-1);
        green_three_animation.goToAndPlay();
    });


    var squares1 = document.getElementById("rama-btn");
    var animation1 = bodymovin.loadAnimation({
        container: squares1,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen.json"
    });
    
    
    jQuery(squares1).mouseenter(function(){
        animation1.setDirection(0);
        animation1.play();
    });
    jQuery(squares1).mouseleave(function(){
        animation1.setDirection(-1);
        animation1.goToAndPlay();
    });

    var rama_two_squares = document.getElementById("rama-btn-two");
    var rama_two_animation = bodymovin.loadAnimation({
        container: rama_two_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen.json"
    });
    
    
    jQuery(rama_two_squares).mouseenter(function(){
        rama_two_animation.setDirection(0);
        rama_two_animation.play();
    });
    jQuery(rama_two_squares).mouseleave(function(){
        rama_two_animation.setDirection(-1);
        rama_two_animation.goToAndPlay();
    });

    // four
    var rama_four_squares = document.getElementById("rama-btn-four");
    var rama_four_animation = bodymovin.loadAnimation({
        container: rama_four_squares,
        renderer: "svg/canvas/html",
        loop: false,
        autoplay: false,
        path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen.json"
    });
    
    
    jQuery(rama_four_squares).mouseenter(function(){
        rama_four_animation.setDirection(0);
        rama_four_animation.play();
    });
    jQuery(rama_four_squares).mouseleave(function(){
        rama_four_animation.setDirection(-1);
        rama_four_animation.goToAndPlay();
    });


     

    // white button
        var white_squares = document.getElementById("white-btn");
        var white_animation = bodymovin.loadAnimation({
            container: white_squares,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttonwhite.json"
        });
        
        
        jQuery(white_squares).mouseenter(function(){
            white_animation.setDirection(0);
            white_animation.play();
        });
        jQuery(white_squares).mouseleave(function(){
            white_animation.setDirection(-1);
            white_animation.goToAndPlay();
        });



    // green our vision
        var green_ov_squares = document.getElementById("green-ov-btn");
        var green_ov_animation = bodymovin.loadAnimation({
            container: green_ov_squares,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen.json"
        });
        
        
        jQuery(green_ov_squares).mouseenter(function(){
            green_ov_animation.setDirection(0);
            green_ov_animation.play();
        });
        jQuery(green_ov_squares).mouseleave(function(){
            green_ov_animation.setDirection(-1);
            green_ov_animation.goToAndPlay();
        });


    // white button
        var white_squares = document.getElementById("white-btn1");
        var white_animation = bodymovin.loadAnimation({
            container: white_squares,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/letgetyoucoveredbuttonwhite1.json"
        });
        
        
        jQuery(white_squares).mouseenter(function(){
            white_animation.setDirection(0);
            white_animation.play();
        });
        jQuery(white_squares).mouseleave(function(){
            white_animation.setDirection(-1);
            white_animation.goToAndPlay();
        });
    // green our vision
        var green_ov_squares = document.getElementById("green-ov-btn-secure");
        var green_ov_animation = bodymovin.loadAnimation({
            container: green_ov_squares,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/ourvisionbuttongreen1.json"
        });
        
        
        jQuery(green_ov_squares).mouseenter(function(){
            green_ov_animation.setDirection(0);
            green_ov_animation.play();
        });
        jQuery(green_ov_squares).mouseleave(function(){
            green_ov_animation.setDirection(-1);
            green_ov_animation.goToAndPlay();
        });


    //right arrow home
        var arrow_sky = document.getElementById("right-arrow-home");
        var arrow_animation = bodymovin.loadAnimation({
            container: arrow_sky,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/right_arrow_home.json"
        });
        
        
        jQuery(arrow_sky).mouseenter(function(){
            arrow_animation.setDirection(0);
            arrow_animation.play();
        });
        jQuery(arrow_sky).mouseleave(function(){
            arrow_animation.setDirection(-1);
            arrow_animation.goToAndPlay();
        });


    //right arrow home two
        var arrow_sky_two = document.getElementById("right-arrow-home-two");
        var arrow_two_animation = bodymovin.loadAnimation({
            container: arrow_sky_two,
            renderer: "svg/canvas/html",
            loop: false,
            autoplay: false,
            path: "<?php echo get_theme_file_uri() ?>/json/right_arrow_home.json"
        });
        
        
        jQuery(arrow_sky_two).mouseenter(function(){
            arrow_two_animation.setDirection(0);
            arrow_two_animation.play();
        });
        jQuery(arrow_sky_two).mouseleave(function(){
            arrow_two_animation.setDirection(-1);
            arrow_two_animation.goToAndPlay();
        });



    // voIP
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('voip-svg-running'), // Required
        path: '<?php echo get_theme_file_uri() ?>/json/secure.json', // Required
        renderer: 'svg/canvas/html', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "Hello World", // Name for future reference. Optional.
    })

    // rounded
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('round-svg-running'), // Required
        path: '<?php echo get_theme_file_uri() ?>/json/disasterlottie.json', // Required
        renderer: 'svg/canvas/html', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "Hello World", // Name for future reference. Optional.
    })

    // compliance
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('compliance'), // Required
        path: '<?php echo get_theme_file_uri() ?>/json/compliance.json', // Required
        renderer: 'svg/canvas/html', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "Hello World", // Name for future reference. Optional.
    })
/* Front page js end*/


</script>