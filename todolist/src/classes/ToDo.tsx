export default class ToDo {
    public id: number;
    public text: string;
    public completed: boolean;
    public constructor(id: number, text: string, completed: boolean) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}