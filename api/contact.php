<?php
header('Content-Type: application/json');

// Configuración de correos
$to = "correo@intelector.ec"; // Correo principal que recibirá el mensaje
$cc = "inter1@intelector.ec"; // Correo al que se reenviará (opcional)
$subject = "Nuevo mensaje de contacto desde tu sitio web";

// Obtener los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Validar y sanitizar los datos
$name = filter_var($data['name'], FILTER_SANITIZE_STRING);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
$company = filter_var($data['company'], FILTER_SANITIZE_STRING);
$position = filter_var($data['position'], FILTER_SANITIZE_STRING);
$country = filter_var($data['country'], FILTER_SANITIZE_STRING);
$message = filter_var($data['message'], FILTER_SANITIZE_STRING);

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Construir el cuerpo del mensaje
$email_body = "Has recibido un nuevo mensaje de contacto:\n\n";
$email_body .= "Nombre: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Teléfono: $phone\n";
$email_body .= "Empresa: $company\n";
$email_body .= "Puesto: $position\n";
$email_body .= "País: $country\n\n";
$email_body .= "Mensaje:\n$message\n";

// Cabeceras del correo
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Cc: $cc\r\n"; // Para reenviar a otro correo
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar el correo
$mail_sent = mail($to, $subject, $email_body, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Error al enviar el mensaje']);
}
?>