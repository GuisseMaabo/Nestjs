import { Controller, Body, UsePipes, ValidationPipe, Post, Get, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateEventDto } from 'src/auth/dto/create-event.dto';
import { EventService } from './event.service';
import {Event} from 'src/event/event.entity';
import {GetEventsDto} from 'src/auth/dto/get-event.dto';

@Controller('event')
export class EventController {
    constructor(
        private eventService : EventService,
    ){}
// Creer un evenement 
    @Post('/createEvent')
    @UsePipes(ValidationPipe)
    createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventService.createEvent(createEventDto);
      }
//Lister l'nsemble des evenements 
      @Get('/getEvents')
      getEvents(@Body() getEventsDto : GetEventsDto) : Promise <Event [] > {
          return this.eventService.getEvent(getEventsDto);
      }
// Chercher un evenment en se basant sur L'id 
      @Get('/:id')
      getEventById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
        return this.eventService.getEventById(id);
      }
    
// Modifier un evenement selon l'id  selectionner 
      @Patch('/:id')
      updateEvents(
        @Param('id', ParseIntPipe) id: number,
        @Body()  event_title, location, starts,ends,event_description,event_type,event_topic, event_image: CreateEventDto,
      ):  Promise<Event> {
        return this.eventService.updateEvents(id,event_title, location, starts,ends,event_description,event_type,event_topic, event_image);
      }
// Supprimer un evenement en se basant sur la l'id  
      @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.eventService.deleteEvent(id);
    }


}
