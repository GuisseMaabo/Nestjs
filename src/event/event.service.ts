import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { SessionRepository } from './sessions.repository';
import { TicketsRepository } from './tickets.repository';
import { CreateEventDto } from 'src/auth/dto/create-event.dto';
import {Event} from 'src/event/event.entity';
import { GetEventsDto } from 'src/auth/dto/get-event.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventRepository)
        @InjectRepository(SessionRepository)
        @InjectRepository(TicketsRepository)
        private eventDto : EventRepository,
        )   
    {}
    async createEvent( createEventDto : CreateEventDto): Promise<Event> {
       
        return this.eventDto.createEvent(createEventDto);
      }

      async getEvent(listingEvents: GetEventsDto): Promise<Event []> {
        return this.eventDto.getEvent(listingEvents);
      }
      
      async getEventById(id: number): Promise<Event> {
        const found = await this.eventDto.findOne(id);
    
        if (!found) {
          throw new NotFoundException(`Event with ID "${id}" not found`);
        }
    
        return found;
      }
    

      async updateEvents( id: number, event_title, location, starts,ends,event_description,event_type,event_topic, event_image  : CreateEventDto): Promise<Event> {
        
        const event = await this.getEventById(id);
        event.event_title = event_title ;
        event.location = location;
        event.starts = starts;
        event.ends = ends;
        event.event_description = event_description;
        event.event_topic = event_topic;
        event.event_type = event_type ;
        
        await event.save();
        return event;
      }

      async deleteEvent(id: number): Promise<void> {
        const result = await this.eventDto.delete(id);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
      }
}
