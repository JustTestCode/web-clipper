import { CompleteStatus } from './../interface';
import { DocumentService, CreateDocumentRequest } from '../../index';
import { ObsidianBackendServiceConfig } from './interface';
function pathJoin(parts: string[], separator: string = '/') {
  let replace = new RegExp(`${separator}{1,}`, 'g');
  return parts.join(separator).replace(replace, separator);
}
export default class ObsidianDocumentService implements DocumentService {
  private config: ObsidianBackendServiceConfig;
  constructor(config: ObsidianBackendServiceConfig) {
    this.config = config;
  }
  copyToClipboard = (text: string) => {
    function oncopy(event: any) {
      document.removeEventListener('copy', oncopy, true);
      // Hide the event from the page to prevent tampering.
      event.stopImmediatePropagation();

      // Overwrite the clipboard content.
      event.preventDefault();
      event.clipboardData.setData('text/plain', text);
      // event.clipboardData.setData("text/html", html);
    }
    document.addEventListener('copy', oncopy, true);

    // Requires the clipboardWrite permission, or a user gesture:
    document.execCommand('copy');
  };
  getId = () => {
    return 'obsidian';
  };

  getRepositories = async () => {
    return [
      {
        id: 'obsidian',
        name: `Send to obsidian`,
        groupId: 'obsidian',
        groupName: 'Obsidian',
      },
    ];
  };

  createDocument = async ({ title, content }: CreateDocumentRequest): Promise<CompleteStatus> => {
    const fullPath = pathJoin([this.config.directory ?? '', `${title}.md`]);
    let info:string=`---
    title: ${title}
    url: ${window.location.href}
    ---

    `



    this.copyToClipboard(info+content);
    window.location.href = `obsidian://advanced-uri?vault=${this.config.valutName}&clipboard=true&mode=new&filepath=${fullPath}`;
    return {
      href: `obsidian://open?file=${encodeURIComponent(title)}`,
    };
  };

  getUserInfo = async () => {
    // 先请求下, 确保接能通
    return {
      name: 'Obsidian',
      avatar: 'https://avatars.githubusercontent.com/u/65011256?s=200&v=4',
      homePage: 'https://obsidian.md',
      description: `send to obsidian
by obsidian-local-rest-api`,
    };
  };
}
