import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  
  import { CompaniesService } from './companies.service';
  
  @Controller('companies')
  export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}
  
    /*@Post()
    async addProduct(
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
      const generatedId = await this.productsService.insertProduct(
        prodTitle,
        prodDesc,
        prodPrice,
      );
      return { id: generatedId };
    }*/
  
    @Get()
    async getAllCompanies() {
      const companies = await this.companiesService.getCompanies();
      console.log(companies)
      return companies;
    }
 
    @Get(':name')
    getCompany(@Param('name') name: string) {
      return this.companiesService.getSingleCompany(name);
    }
   /*
    @Patch(':id')
    async updateProduct(
      @Param('id') prodId: string,
      @Body('title') prodTitle: string,
      @Body('description') prodDesc: string,
      @Body('price') prodPrice: number,
    ) {
      await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
      return null;
    }
  
    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
    */
  }
  