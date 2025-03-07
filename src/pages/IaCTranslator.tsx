
import React, { useState } from 'react';
import NavBar from '../components/layout/NavBar';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import FAQ from '../components/ui/FAQ';

const IaCTranslator = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [targetCode, setTargetCode] = useState('');
  const [sourceFormat, setSourceFormat] = useState('terraform');
  const [targetFormat, setTargetFormat] = useState('cloudformation');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = () => {
    setIsTranslating(true);
    
    // In a real implementation, this would call an API
    // For demo purposes, we'll simulate a translation
    setTimeout(() => {
      // Restructured the simpleTranslations object to fix type errors
      const simpleTranslations: {[key: string]: {[key: string]: string}} = {
        terraform: {
          cloudformation: `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "MyEC2Instance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "InstanceType": "t2.micro",
        "ImageId": "ami-0c55b159cbfafe1f0"
      }
    }
  }
}`,
          pulumi: `import * as aws from "@pulumi/aws";

const instance = new aws.ec2.Instance("myInstance", {
    instanceType: "t2.micro",
    ami: "ami-0c55b159cbfafe1f0"
});

export const instanceId = instance.id;`
        },
        cloudformation: {
          terraform: `provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}`
        },
        pulumi: {
          terraform: `provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}`
        }
      };
      
      if (sourceCode.trim() === '') {
        setTargetCode('// Please enter source code to translate');
      } else if (simpleTranslations[sourceFormat] && simpleTranslations[sourceFormat][targetFormat]) {
        setTargetCode(simpleTranslations[sourceFormat][targetFormat]);
      } else {
        setTargetCode(`// Translation from ${sourceFormat} to ${targetFormat} is not available in this demo`);
      }
      
      setIsTranslating(false);
    }, 1500);
  };

  const faqItems = [
    {
      question: "What is Infrastructure as Code (IaC)?",
      answer: "Infrastructure as Code is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools."
    },
    {
      question: "What IaC formats does the translator support?",
      answer: "Our translator currently supports Terraform, AWS CloudFormation, and Pulumi. More formats will be added in future updates."
    },
    {
      question: "Is this translation 100% accurate?",
      answer: "While our translator handles most common patterns, complex configurations may require manual adjustment. We recommend reviewing the translated code before deployment."
    },
    {
      question: "Can I translate Azure ARM templates?",
      answer: "Azure ARM template support is coming soon. Currently, we focus on AWS-related infrastructure code formats."
    }
  ];

  return (
    <div className="min-h-screen theme-gradient flex flex-col">
      <NavBar />
      
      <main className="flex-grow p-8">
        <div className="container max-w-5xl mx-auto page-transition">
          <h1 className="text-3xl md:text-4xl font-light text-white mb-8 text-center">
            IaC Translator
          </h1>
          
          <Card className="bg-theme-light/30 backdrop-blur-md border border-white/20 p-6 rounded-xl">
            <Tabs defaultValue="translator" className="w-full">
              <TabsList className="mb-6 bg-theme-dark/20">
                <TabsTrigger value="translator" className="text-theme-dark">Translator</TabsTrigger>
                <TabsTrigger value="examples" className="text-theme-dark">Examples</TabsTrigger>
              </TabsList>
              
              <TabsContent value="translator" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
                  <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-theme-dark font-medium">Source Format</label>
                    <Select value={sourceFormat} onValueChange={setSourceFormat}>
                      <SelectTrigger className="bg-white/70 text-theme-dark">
                        <SelectValue placeholder="Select source format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="terraform">Terraform</SelectItem>
                        <SelectItem value="cloudformation">CloudFormation</SelectItem>
                        <SelectItem value="pulumi">Pulumi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full md:w-1/3 space-y-2">
                    <label className="text-theme-dark font-medium">Target Format</label>
                    <Select value={targetFormat} onValueChange={setTargetFormat}>
                      <SelectTrigger className="bg-white/70 text-theme-dark">
                        <SelectValue placeholder="Select target format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="terraform">Terraform</SelectItem>
                        <SelectItem value="cloudformation">CloudFormation</SelectItem>
                        <SelectItem value="pulumi">Pulumi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleTranslate} 
                    disabled={isTranslating}
                    className="bg-theme-dark hover:bg-theme-dark/80 text-white px-6"
                  >
                    {isTranslating ? "Translating..." : "Translate"}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-theme-dark font-medium">Source Code</label>
                    <Textarea 
                      value={sourceCode}
                      onChange={(e) => setSourceCode(e.target.value)}
                      placeholder={`Enter your ${sourceFormat} code here...`}
                      className="min-h-[300px] font-mono text-sm bg-white/70 text-theme-dark"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-theme-dark font-medium">Target Code</label>
                    <Textarea 
                      value={targetCode}
                      readOnly
                      placeholder={`Translated ${targetFormat} will appear here...`}
                      className="min-h-[300px] font-mono text-sm bg-white/70 text-theme-dark"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                <div className="bg-white/70 rounded-lg p-4 border border-white/30 text-theme-dark">
                  <h3 className="font-medium mb-2">Example Terraform</h3>
                  <pre className="bg-theme-dark/10 p-3 rounded-md overflow-x-auto text-xs">
{`provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  tags = {
    Name = "example-instance"
  }
}`}
                  </pre>
                </div>
                
                <div className="bg-white/70 rounded-lg p-4 border border-white/30 text-theme-dark">
                  <h3 className="font-medium mb-2">Example CloudFormation</h3>
                  <pre className="bg-theme-dark/10 p-3 rounded-md overflow-x-auto text-xs">
{`{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "MyEC2Instance": {
      "Type": "AWS::EC2::Instance",
      "Properties": {
        "InstanceType": "t2.micro",
        "ImageId": "ami-0c55b159cbfafe1f0",
        "Tags": [
          { "Key": "Name", "Value": "example-instance" }
        ]
      }
    }
  }
}`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <FAQ items={faqItems} />
        </div>
      </main>
      
      <footer className="py-4 text-center text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} CloudMorph. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IaCTranslator;
