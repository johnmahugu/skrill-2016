<?php

header('Content-type: image/jpeg');

$image = new Imagick('homepage_consumer.jpg');

$image->blurImage(5,3);
echo $image;

?>