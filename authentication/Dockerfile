FROM public.ecr.aws/lambda/nodejs:12

COPY . .

RUN npm install

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.lambdaHandler"]
