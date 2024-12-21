function validateCardNumber(input) {
    // Solo permite números (elimina cualquier carácter no numérico)
    input.value = input.value.replace(/\D/g, '');

    // Limita a 16 caracteres
    if (input.value.length > 16) {
        input.value = input.value.slice(0, 16);
    }
}
