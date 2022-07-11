
const createResponse = (message, status, data) => {
    return {
        message: message,
        status: status,
        data: data
    }
}

const badRequestResponse = (error) => {
    let errorResponse = []
    for (const val of error.details) {
        errorResponse.push({
            message: val.message,
            path: val.path[0]
        })
    }   
    return {
        message: 'Bad request',
        status: 400,
        data: {
            errors: errorResponse
        },
    }
}

const unauthorizedResponse = (message) => {
    return {
        message: message || 'Unauthorized',
        status: 401,
        data: null,
    }
}

module.exports = helper = {
    createResponse,
    badRequestResponse,
    unauthorizedResponse
}

