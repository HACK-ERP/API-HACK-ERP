const sendNotification = (type, user, receiver, otReference) => {
    console.log("Notification type:", type);
    const notificationMessage = {
        afterCreateOT: `Se ha creado la OT ${otReference}`,
        materialsRequest: `Se ha solicitado material para la OT ${otReference}`,
        materialsDelivered: `Se ha entregado material para la OT ${otReference}`,
        startProduction: `Se ha iniciado la producción de la OT ${otReference}`,
        orderDelivered: `Se ha entregado la OT ${otReference}`,
    };
    const notification = {
        sender: user,
        receiver,
        message: notificationMessage[type],
    };
    return notification;
}

module.exports = sendNotification;