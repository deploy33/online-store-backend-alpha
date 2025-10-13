// единый формат JSON-ответов
export function sendResponse(res, status, message, data = null) {

    const response = {
        status,
        message,
        data: data ?? null, // поле всегда есть, даже если null
    };
    // вариант с проверкой
    // if (data !== null) {
    //     response.data = data;
    // }

    // отправка клиенту
    return res.status(status).json(response);

}