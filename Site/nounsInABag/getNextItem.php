<?php

$list = file_get_contents("../../data/list.txt");
$list = explode("\n", $list);
$list = array_filter($list);
$item = array_pop($list);
$list = implode("\n", $list);

$fp = fopen("../../data/list.txt","w");
fwrite($fp, $list);
fclose($fp);

echo $item;

?> 