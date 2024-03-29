export const userSchema = {
    "name": 'addUser',
    "description": 'Add a new user',
    "parameters": {
        'type': 'object',
        'properties': {
            'name': {
                'type': 'string',
                'description': 'Provide user name'
            },
            'surname': {
                'type': 'string',
                'description': 'Provide user surname'
            },
            'year': {
                'type': 'number',
                'description': 'Provide user year of born'
            }
        },
        'required': ['name', 'surname', 'year']
    }
}