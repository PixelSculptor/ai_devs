export function getNames(names: string[]){
    return names.map(sentence => sentence.split(' ')[0]);
}

export function findNameInQuestion(question: string, listNames: string[]){
    const words = question.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(' ');

    return  listNames.find(name => words.includes(name));
}

export function filterAnswers(questions: string[], name: string){
   return questions.find(question => {
        const filteredAnswers = question.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").split(' ');
        return filteredAnswers.includes(name);
   }) || 'Brak informacji w bazie danych';
}
