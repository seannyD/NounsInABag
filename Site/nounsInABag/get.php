<?php

$list = file_get_contents("../../data/list.txt");
$list = explode("\n",$list);
$list = array_filter($list);
$list = implode("\n",$list);
echo $list;

?> 