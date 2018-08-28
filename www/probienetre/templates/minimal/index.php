<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">

        <title><?php echo($page_title); ?></title>

        <?php echo($page_meta); ?>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="<?php echo($template_dir_url); ?>style.css?v=8">
        <link href="http://fonts.googleapis.com/css?family=Lustria" rel="stylesheet" type="text/css">

        <?php get_header(); ?>
    </head>

    <body>
        <?php if($is_home) { ?>
      <header class="green">
        <div class="words">
          <h1><?php echo($intro_title); ?></h1>
          <p><?php echo($intro_text); ?></p>
        </div>

        <ul class="info">
          <li><a href="mailto:<?php echo($blog_email); ?>?subject=Coucou"><?php echo($blog_email); ?></a>
          </li>
        </ul>
      </header>
        <?php } ?>

        <?php echo($content); ?>

        <?php get_footer(); ?>
    </body>
</html>
