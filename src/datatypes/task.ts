interface ITask {
  name: string;
  id: number;
  done: boolean;
}

export class Task implements  ITask {
  name: string;
  id: number;
  done: boolean;

  constructor(obj: ITask) {
    Object.assign(this, obj);
  }
}
