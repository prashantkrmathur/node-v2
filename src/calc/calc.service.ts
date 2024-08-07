import { Injectable, BadRequestException } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcDto: CalcDto) {
    try {
      let expression = calcDto.expression.replace(/\s+/g, '');

      if (!this.isValidExpression(expression)) {
        throw new BadRequestException('Invalid expression provided');
      }

      const result = this.evaluate(expression);

      return { statusCode: 200, result: result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private isValidExpression(expression: string): boolean {
    const validRegex = /^(\d+([+\-*/]\d+)+)+$/;
    return validRegex.test(expression);
  }

  private evaluate(expression: string): number {
    const numbers = expression.split(/[\+\-\*\/]/).map(num => parseFloat(num));
    const operators = expression.split(/\d+/).filter(op => op);

    if (numbers.length - 1 !== operators.length) {
      throw new BadRequestException('Invalid expression format');
    }

    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
        case '+':
          result += numbers[i + 1];
          break;
        case '-':
          result -= numbers[i + 1];
          break;
        case '*':
          result *= numbers[i + 1];
          break;
        case '/':
          if (numbers[i + 1] === 0) throw new BadRequestException('Division by zero');
          result /= numbers[i + 1];
          break;
      }
    }
    return result;
  }
}
