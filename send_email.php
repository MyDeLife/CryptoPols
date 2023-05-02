<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = isset($_POST["email"]) ? $_POST["email"] : "";
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    // Replace newline characters with HTML line breaks
    $formatted_message = nl2br($message);

    // Your email address where you want to receive the email
    $to = "estherwoo86@gmail.com";
    $from_email = "mydelife.cryptopols@gmail.com"; // Replace this with a valid email address from your domain
    $headers = "From: " . $from_email . "\r\n";
    $headers .= !empty($email) ? "Reply-To: " . $email . "\r\n" : "";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Add Name to the email content with a line break
    $email_content = "Name: $name<br><br>";
    $email_content .= $formatted_message;

    if (mail($to, $subject, $formatted_message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "An error occurred while sending the email. Please try again later.";
    }
}
?>