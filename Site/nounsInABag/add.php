<?php

$item = $_POST['item'];

$fp = fopen("../../data/list.txt","a");
fwrite($fp, $item."\n");
fclose($fp);


?> 