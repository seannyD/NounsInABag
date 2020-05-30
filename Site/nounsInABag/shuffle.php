<?php

$list = file_get_contents("../../data/list.txt");
$list = explode("\n",$list);
shuffle($list);
$list = array_filter($list);
$list = implode("\n",$list);

$fp = fopen("../../data/list.txt","w");
fwrite($fp, $list);
fclose($fp);


?> 