import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Companies } from './company.model';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Companies') private readonly companyModel: Model<Companies>,
  ) { }



  async getCompanies() {
    var rowsCount = 0
    this.companyModel.estimatedDocumentCount({}, function (err, count) {
      if (err) {
        console.log('Error: ' + err)
      }

      rowsCount = count - 10

      console.log('Rows: ' + rowsCount)
    })
    const companies = await this.companyModel.find().skip(rowsCount).exec();
    return companies.map(comp => ({
      name: comp.name,
      email_address: comp.email_address,
      description: comp.description,
      available_sizes: comp.image.available_sizes
    }));
  }

  async getSingleCompany(name: string) {
    const company = await this.findCompany(name);
    return {
      id: company.id,
      name: company.name,
      description: company.description,
      email_address: company.email_address,
      available_sizes: company.image.available_sizes
    };
  }

  private async findCompany(name: string): Promise<Companies> {
    let company;
    try {
      company = await this.companyModel.findOne({ "name": name }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!company) {
      throw new NotFoundException('Could not find product.');
    }
    return company;
  }

  /* async insertProduct(title: string, desc: string, price: number) {
   const newProduct = new this.productModel({
     title,
     description: desc,
     price,
   });
   const result = await newProduct.save();
   return result.id as string;
 }*/

  /*
    async updateProduct(
      productId: string,
      title: string,
      desc: string,
      price: number,
    ) {
      const updatedProduct = await this.findProduct(productId);
      if (title) {
        updatedProduct.title = title;
      }
      if (desc) {
        updatedProduct.description = desc;
      }
      if (price) {
        updatedProduct.price = price;
      }
      updatedProduct.save();
    }
  
    async deleteProduct(prodId: string) {
      const result = await this.productModel.deleteOne({_id: prodId}).exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find product.');
      }
    }
  
    private async findProduct(id: string): Promise<Product> {
      let product;
      try {
        product = await this.productModel.findById(id).exec();
      } catch (error) {
        throw new NotFoundException('Could not find product.');
      }
      if (!product) {
        throw new NotFoundException('Could not find product.');
      }
      return product;
    }
    */
}
