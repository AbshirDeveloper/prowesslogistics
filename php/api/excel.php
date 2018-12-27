<?php

require '../vendor/autoload.php';


use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;

$spreadsheet = new Spreadsheet();

//Specify the properties for this document
$spreadsheet->getProperties()
    ->setTitle('PHP Download Example')
    ->setSubject('A PHPExcel example')
    ->setDescription('A simple example for PhpSpreadsheet. This class replaces the PHPExcel class')
    ->setCreator('php-download.com')
    ->setLastModifiedBy('php-download.com');

//Adding data to the excel sheet
$spreadsheet->setActiveSheetIndex(0)
    ->setCellValue('A1', 'This')
    ->setCellValue('A2', 'is')
    ->setCellValue('A3', 'only')
    ->setCellValue('A4', 'an')
    ->setCellValue('A5', 'example');

$spreadsheet->getActiveSheet()
    ->setCellValue('B1', "You")
    ->setCellValue('B2', "can")
    ->setCellValue('B3', "download")
    ->setCellValue('B4', "this")
    ->setCellValue('B5', "library")
    ->setCellValue('B6', "on")
    ->setCellValue('B7', "https://php-download.com/package/phpoffice/phpspreadsheet");


$spreadsheet->getActiveSheet()
    ->setCellValue('C1', 1)
    ->setCellValue('C2', 0.5)
    ->setCellValue('C3', 0.25)
    ->setCellValue('C4', 0.125)
    ->setCellValue('C5', 0.0625);

$spreadsheet->getActiveSheet()
    ->setCellValue('C6', '=SUM(C1:C5)');
$spreadsheet->getActiveSheet()
    ->getStyle("C6")->getFont()
    ->setBold(true);
    
$myWorkSheet = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, 'Abshir');
$spreadsheet->addSheet($myWorkSheet, 0);

$writer = IOFactory::createWriter($spreadsheet, "Xlsx"); //Xls is also possible
$writer->save("my_excel_file.xlsx");