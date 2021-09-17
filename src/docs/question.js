const endpoints = {
  '/questions': {
    post: {
      tags: ['questions'],
      summary: 'post question',
      description: 'post question',
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
              question: {
                type: 'string'
              }
            }
          }
        }
      ],
      responses: {
        201: {
          description: 'question posted'
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
  '/questions/{questionId}': {
    get: {
      tags: ['questions'],
      summary: 'Get question details',
      description: 'Get question details',
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
          description: 'question details fetched'
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
  '/questions/user-questions': {
    get: {
      tags: ['questions'],
      summary: 'Get user question ',
      description: 'Get user question ',
      security: [
        {
          bearer: []
        }
      ],
      responses: {
        200: {
          description: 'question details fetched'
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
  '/questions/available-questions': {
    get: {
      tags: ['questions'],
      summary: 'Get all question ',
      description: 'Get all question ',
      security: [
        {
          bearer: []
        }
      ],
      responses: {
        200: {
          description: 'questions fetched'
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
