import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { BuscarMutanteService } from './buscar-mutante/buscar-mutante.service';
import * as express from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly buscarMutanteService: BuscarMutanteService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/mutant')
  mutant(@Request() req, @Response() response : express.Response) {

    let respuesta = this.buscarMutanteService.buscarMutante(req.body.dna)
    
    response.sendStatus(respuesta?200:403)

    
  }

  @Get('/stats')
  stats(@Request() req, @Response() response : express.Response) {

    let respuesta = this.buscarMutanteService.buscarEstadistica();
    
    response.send(JSON.stringify(respuesta));

    
  }
}
