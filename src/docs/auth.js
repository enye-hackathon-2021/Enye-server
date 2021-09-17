const endpoints = {
  '/auth/register': {
    post: {
      tags: ['auth'],
      summary: 'Create an account',
      description: 'Create an account',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Request payload',
          schema: {
            type: 'object',
            properties: {
              role: {
                type: 'string'
              },
              password: {
                type: 'string'
              },
              email: {
                type: 'string'
              },
              name: {
                type: 'string'
              },
              gender: {
                type: 'string'
              },
              age: {
                type: 'integer'
              },
              field: {
                type: 'string'
              },
              experienceLevel: {
                type: 'string'
              }
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Sign up successful'
        },
        400: {
          description: 'Bad request'
        }, 
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/auth/login': {
    post: {
      tags: ['auth'],
      summary: 'login to an account',
      description: 'login to an account',
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Request payload',
          schema: {
            type: 'object',
            properties: {
              role: {
                type: 'string'
              },
              password: {
                type: 'string'
              },
              email: {
                type: 'string'
              }
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'login successful'
        },
        400: {
          description: 'Bad request'
        }, 
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/auth/balance': {
    get: {
      tags: ['auth'],
      summary: 'Get user wallet balance',
      description: 'Get user wallet balance',
      security: [
        {
          Bearer: []
        }
      ],
      responses: {
        200: {
          description: 'Balanced fetched successful'
        },
        400: {
          description: 'Bad request'
        }, 
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/auth/fund-wallet': {
    get: {
      tags: ['auth'],
      summary: 'fund user wallet balance',
      description: 'fund user wallet balance',
      security: [
        {
          Bearer: []
        }
      ],
      parameters: [
        { 
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              amount: {
                type: 'integer'
              }
            }
          }
        }
      ],
      responses: {
        200: {
          description: 'Balanced fetched successful'
        },
        400: {
          description: 'Bad request'
        }, 
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};

export default endpoints;
