import {utilService} from '../../../services/util.service.js';
import {storageService} from '../../../services/storage.service.js';
import { eventBusService } from "../../../services/event-bus.service.js";

import { mailService } from "../services/mail.service.js";


export class Mail extends React.Component {
    state = {

    }

    componentDidMount() {
        mailService.query()
    }
    

    render() {
        return <div>
            Hello from Mail
        </div>
    }
}