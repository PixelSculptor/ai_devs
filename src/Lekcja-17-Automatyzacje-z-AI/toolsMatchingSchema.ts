export const toolsMatchingSchema = {
    name: 'matchTool',
    description:
        'Decide if given task is to todo list or to calendar based on the latest message.',
    parameters: {
        type: 'object',
        properties: {
            tool: {
                type: 'string',
                description: `Tool has to be set to either:
                'ToDo' - when user want to remind something, do, write, enroll or etc
                'Calendar' - when user want to schedule something, plan, meet, call - especially when task contains concrete date`,
            },
            desc: {
                type: 'string',
                description: `Task description to be match to user's prompt`,
            },
            date: {
                type: 'string',
                description: `Optional parameter, if task contains date and I matched task as 'Calendar', it should be set here. Use format 'YYYY-MM-DD'`,
            },
        },
    },
    required: ['tool', 'desc'],
};
