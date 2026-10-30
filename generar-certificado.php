<?php
// generar-certificado.php
// Genera un certificado PDF usando la plantilla y añade datos + QR
// Uso: generar-certificado.php?nombre=Juan+Perez&programa=Curso+BPM&fecha=2026-10-29&horas=40&codigo=SGCIA-26-001

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Parámetros
$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : 'Nombre del Alumno';
$programa = isset($_GET['programa']) ? $_GET['programa'] : 'Nombre del Programa';
$fecha = isset($_GET['fecha']) ? $_GET['fecha'] : date('Y-m-d');
$horas = isset($_GET['horas']) ? $_GET['horas'] : '40';
$codigo = isset($_GET['codigo']) ? $_GET['codigo'] : 'CODIGO-001';

// Load Moodle config for TCPDF
require('/home/guanbhctsy/proinocuidad.com/aula/config.php');
require_once($CFG->libdir . '/pdflib.php');
require_once($CFG->dirroot . '/mod/assign/feedback/editpdf/fpdi/autoload.php');

// Template path
$templatePath = '/home/guanbhctsy/tmp/PDF-PLANTILLA.pdf';

// Generate PDF
$pdf = new setasign\Fpdi\Tcpdf\Fpdi();
$pdf->setSourceFile($templatePath);
$tplId = $pdf->importPage(1);
$pdf->addPage();
$pdf->useTemplate($tplId);

// --- Ajustar estas coordenadas según la plantilla ---
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
$pdf->Cell(0, 10, 'Fecha de término: ' . $fecha, 0, 1, 'C');

// Texto: Horas
$pdf->SetXY(40, 170);
$pdf->Cell(0, 10, 'Horas académicas: ' . $horas, 0, 1, 'C');

// Texto: Código
$pdf->SetFont('helvetica', '', 10);
$pdf->SetXY(40, 185);
$pdf->Cell(0, 10, 'Código: ' . $codigo, 0, 1, 'C');

// QR code
$qrUrl = 'https://proinocuidad.com/verifica-tu-certificado.html?codigo=' . urlencode($codigo);
$pdf->write2DBarcode($qrUrl, 'QRCODE,H', 150, 200, 40, 40);

// Output
$outputPath = '/home/guanbhctsy/proinocuidad.com/certificados/' . $codigo . '.pdf';
if (!is_dir('/home/guanbhctsy/proinocuidad.com/certificados')) {
    mkdir('/home/guanbhctsy/proinocuidad.com/certificados', 0755, true);
}
$pdf->Output($outputPath, 'F');

echo json_encode(['success' => true, 'file' => $outputPath, 'url' => 'https://proinocuidad.com/certificados/' . $codigo . '.pdf']);
