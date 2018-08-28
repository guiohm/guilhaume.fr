<?php
// require('logging.php');

$to = 'livre_or_form@guilhaume.fr';
$from = 'mon_site_web@guilhaume.fr';
$nom = $_POST['nom'];
$email = $_POST['email'];
$temoignage = $_POST['temoignage'];
$subject = "Formulaire Livre d'Or";
$message = "Email: $email\n"
          ."Nom: $nom\n\n"
          ."Témoignage:\n\n$temoignage";

$headers = "From:" . $from;

$result = 0;
if (!empty(trim($temoignage))) {
    $result = mail($to, $subject, $message, $headers);
}

echo '{"success":'.($result ? '1' : '0').'}';
