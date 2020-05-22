import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private webReqService: WebRequestService) { }

  // Board methods

  getBoards() {
    // Sent request to create a new list
    return this.webReqService.get('boards');
  }

  getBoard(id: string) {
    return this.webReqService.get(`boards/${id}`);
  }

  createBoard(title: string) {
    // Sent request to create a new list
    return this.webReqService.post('boards', {title});
  }

  deleteBoard(id: string) {
    return this.webReqService.delete(`boards/${id}`);
  }

  editBoard(id: string, title: string) {
    return this.webReqService.patch(`boards/${id}`, {title});
  }

  // Finished board methods

  // Column methods

  getColumns(boardId: string) {
    return this.webReqService.get(`boards/${boardId}/columns`);
  }

  getColum(boardId: string, id: string) {
    return this.webReqService.get(`boards/${boardId}/columns/${id}`);
  }

  createColum(boardId: string, title: string) {
    return this.webReqService.post(`boards/${boardId}/columns`, {title});
  }

  deleteColum(boardId: string, id: string) {
    return this.webReqService.delete(`boards/${boardId}/columns/${id}`);
  }

  editColum(boardId: string, id: string, title: string) {
    return this.webReqService.patch(`boards/${boardId}/columns/${id}`, {title});
  }

  // Finished column methods

  // Task methods

  getTasks(boardId: string, columnId: string) {
    return this.webReqService.get(`boards/${boardId}/columns/${columnId}/tasks`);
  }

  getTask(boardId: string, columnId: string, id: string) {
    return this.webReqService.get(`boards/${boardId}/columns/${columnId}/tasks/${id}`);
  }

  createTask(boardId: string, columnId: string, title: string) {
    return this.webReqService.post(`boards/${boardId}/columns/${columnId}/tasks`, {title});
  }

  deleteTask(boardId: string, columnId: string, id: string) {
    return this.webReqService.delete(`boards/${boardId}/columns/${columnId}/tasks/${id}`);
  }

  editTask(boardId: string, columnId: string, id: string, title: string) {
    return this.webReqService.patch(`boards/${boardId}/columns/${columnId}/tasks/${id}`, {title});
  }
}
