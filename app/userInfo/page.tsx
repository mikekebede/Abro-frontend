"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SignLogNavbar from "../components/SignLogNavbar";
import { freelanceJobs } from "../lib/freeLanceJobs";
import { useRouter } from "next/navigation";

const availableSkills = freelanceJobs;

export default function Page() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [skillQuery, setSkillQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredSkills = availableSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(skillQuery.toLowerCase()) &&
      !selectedSkills.includes(skill),
  );

  const addSkill = (skill: string) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSkillQuery("");
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  return (
    <div className="h-screen overflow-hidden">
      <SignLogNavbar />

      <div className="h-screen w-screen flex justify-center items-center mt-16 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-2xl w-full mx-auto my-10 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-serif font-medium text-gray-800 tracking-tight mb-7 text-center">
            Tell us a little bit about yourself✨
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-serif font-medium">Short Description</label>
              <Textarea
                placeholder="Tell us about yourself"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-serif font-medium">Skills</label>
              <Input
                placeholder="Search skills..."
                value={skillQuery}
                onChange={(e) => setSkillQuery(e.target.value)}
              />

              {skillQuery && (
                <div className="border p-2 rounded shadow-sm max-h-32 overflow-y-auto mt-2">
                  {filteredSkills.length ? (
                    filteredSkills.map((skill) => (
                      <div
                        key={skill}
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No skills found</div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} onClick={() => removeSkill(skill)} className="cursor-pointer">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-0 right-10 p-10">
        <Button size="lg" onClick={() => router.push("/userInfo/skills")}>
          Next
        </Button>
      </div>
    </div>
  );
}
