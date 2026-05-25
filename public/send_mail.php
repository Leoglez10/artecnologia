<?php
/**
 * send_mail.php
 * Endpoint para recibir el formulario de contacto y enviar el correo.
 * Subir a la raíz pública del sitio en cPanel (junto a index.html).
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://www.artecnologia.net'); // Cambia por tu dominio real
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder al preflight de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Leer el cuerpo JSON enviado por React
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Sanitizar campos
$nombre   = htmlspecialchars(strip_tags(trim($data['nombre']   ?? '')), ENT_QUOTES, 'UTF-8');
$correo   = filter_var(trim($data['correo']   ?? ''), FILTER_VALIDATE_EMAIL);
$telefono = htmlspecialchars(strip_tags(trim($data['telefono'] ?? '')), ENT_QUOTES, 'UTF-8');
$asunto   = htmlspecialchars(strip_tags(trim($data['asunto']   ?? '')), ENT_QUOTES, 'UTF-8');
$mensaje  = htmlspecialchars(strip_tags(trim($data['mensaje']  ?? '')), ENT_QUOTES, 'UTF-8');

// Validar campos requeridos
if (!$nombre || !$correo || !$mensaje) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit;
}

// ── Configuración ──────────────────────────────────────────────────────────
$destinatario = 'contacto@artecnologia.net';
$remitente    = 'contacto@artecnologia.net';
// ───────────────────────────────────────────────────────────────────────────

$asunto_email = $asunto ?: 'Nuevo contacto desde el sitio web';

$cuerpo = "Nuevo mensaje de contacto desde artecnologia.com.mx\n";
$cuerpo .= str_repeat('-', 50) . "\n";
$cuerpo .= "Nombre:    $nombre\n";
$cuerpo .= "Correo:    $correo\n";
$cuerpo .= "Teléfono:  " . ($telefono ?: 'No proporcionado') . "\n";
$cuerpo .= "Asunto:    " . ($asunto   ?: 'Sin asunto') . "\n";
$cuerpo .= str_repeat('-', 50) . "\n\n";
$cuerpo .= "Mensaje:\n$mensaje\n";

$headers  = "From: $remitente\r\n";
$headers .= "Reply-To: $correo\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$enviado = mail($destinatario, $asunto_email, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(['success' => true, 'message' => 'Correo enviado correctamente']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al enviar el correo. Intenta de nuevo.']);
}
