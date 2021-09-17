const endpoints = {
  '/solutions': {
    post: {
      tags: ['solutions'],
      summary: 'post solutions',
      description: 'post solutions',
      security: [
        {
          bearer: []
        }
      ],
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          description: 'request payload',
          schema: {
            type: 'object',
            properties: {
              answer: {
                type: 'string'
              },
              questionId: {
                type: 'string'
              }
            }
          }
        }
      ],
      responses: {
        201: {
          description: 'solution posted'
        },
        400: {
          description: 'bad request'
        },
        500: {
          description: 'internal server error'
        }
      }
    }
  },
  '/solutions/{questionId}': {
    get: {
      tags: ['solutions'],
      summary: 'Get question solution',
      description: 'Get question solution',
      security: [
        {
          bearer: []
        }
      ],
      parameters: [
        {
          name: 'questionId',
          in: 'path',
          required: true,
          description: 'Question ID',
          type: 'string',
          example: '90r0idiafkdflakfkldfa' 
        }
      ],
      responses: {
        200: {
          description: 'question solution fetched'
        },
        400: {
          description: 'bad request'
        },
        500: {
          description: 'internal server error'
        }
      }
    }
  },
  '/solutions/user-solutions': {
    get: {
      tags: ['solutions'],
      summary: 'Get user solutions ',
      description: 'Get user solutions ',
      security: [
        {
          bearer: []
        }
      ],
      responses: {
        200: {
          description: 'user solutions fetched'
        },
        400: {
          description: 'bad request'
        },
        500: {
          description: 'internal server error'
        }
      }
    }
  },
  '/solutions/doctor-solutions': {
    get: {
      tags: ['solutions'],
      summary: 'Get all doctor solutions ',
      description: 'Get all doctor solutions ',
      security: [
        {
          bearer: []
        }
      ],
      responses: {
        200: {
          description: 'solutions fetched'
        },
        400: {
          description: 'bad request'
        },
        500: {
          description: 'internal server error'
        }
      }
    }
  }
};

export default endpoints;
