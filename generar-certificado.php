<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Parámetros
$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : 'Nombre del Alumno';
$programa = isset($_GET['programa']) ? $_GET['programa'] : 'Nombre del Programa';
$fecha = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d');
$horas = isset($_GET['horas']) ? $_GET['horas'] : '40';
$codigo = isset($_GET['codigo']) ? $_GET['codigo'] : 'CODIGO-001';

// Load TCPDF
require_once('/home/guanbhctsy/proinocuidad.com/aula/lib/tcpdf/tcpdf.php');

// Alias pdf -> TCPDF for FPDI compatibility (avoids Moodle dependency)
if (!class_exists('pdf')) {
    class_alias('TCPDF', 'pdf');
}

// Load FPDI
require_once('/home/guanbhctsy/proinocuidad.com/aula/mod/assign/feedback/editpdf/fpdi/autoload.php');

// Template path
$templatePath = '/home/guanbhctsy/tmp/PDF-PLANTILLA.pdf';

// Generate PDF
$pdf = new setasign\Fpdi\Tcpdf\Fpdi();
$pdf->setSourceFile($templatePath);
$tplId = $pdf->importPage(1);
$pdf->addPage();
$pdf->useTemplate($tplId);

// Texto: Nombre del alumno
$pdf->SetFont('helvetica', 'B', 20);
$pdf->SetXY(40, 120);
$pdf->Cell(0, 10, $nombre, 0, 1, 'C');

// Texto: Programa
$pdf->SetFont('helvetica', '', 14);
$pdf->SetXY(40, 140);
$pdf->MultiCell(0, 8, $programa, 0, 'C');

// Texto: Fecha
$pdf->SetFont('helvetica', '', 12);
$pdf->SetXY(40, 160);
$pdf->Cell(0, 10, 'Fecha de termino: ' . $fecha, 0, 1, 'C');

// Texto: Horas
$pdf->SetXY(40, 170);
$pdf->Cell(0, 10, 'Horas academicas: ' . $horas, 0, 1, 'C');

// Texto: Codigo
$pdf->SetFont('helvetica', '', 10);
$pdf->SetXY(40, 185);
$pdf->Cell(0, 10, 'Codigo: ' . $codigo, 0, 1, 'C');

// QR code
$qrUrl = 'https://proinocuidad.com/verifica-tu-certificado.html?codigo=' . urlencode($codigo);
$pdf->write2DBarcode($qrUrl, 'QRCODE,H', 150, 200, 40, 40);

// Output
$outputPath = '/home/guanbhctsy/proinocuidad.com/certificados/' . $codigo . '.pdf';
if (!is_dir('/home/guanbhctsy/proinocuidad.com/certificados')) {
    mkdir('/home/guanbhctsy/proinocuidad.com/certificados', 0755, true);
}
$pdf->Output($outputPath, 'F');

// Redirect to the PDF
header('Location: https://proinocuidad.com/certificados/' . $codigo . '.pdf');
exit;