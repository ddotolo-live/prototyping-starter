export type Session = {
  sessionId: string;
  roomName: string;
  startedAt: string;
  endedAt: string;
  duration: string;
  participants: number;
  features: string;
  status: "CLOSED" | "ACTIVE";
};

export const mockSessions: Session[] = [
  {
    sessionId: "RM_dTTtaqrTdUJt",
    roomName: "home-DFPu-Mzm8",
    startedAt: "Oct 3, 2025, 3:48:53 pm",
    endedAt: "Oct 3, 2025, 3:50:54 pm",
    duration: "3 min",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_2Pe5VNgQvwCb",
    roomName: "home-uWLJ-HYGk",
    startedAt: "Oct 3, 2025, 3:46:54 pm",
    endedAt: "Oct 3, 2025, 3:47:30 pm",
    duration: "36 sec",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_M76vCJejrvb4",
    roomName: "home-rhML-9lgE",
    startedAt: "Oct 3, 2025, 3:02:03 pm",
    endedAt: "Oct 3, 2025, 3:03:49 pm",
    duration: "2 min",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_8JgKizm95ApD",
    roomName: "home-D7Kk-EXhI",
    startedAt: "Oct 3, 2025, 2:30:57 pm",
    endedAt: "Oct 3, 2025, 2:33:40 pm",
    duration: "3 min",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_DfnDzdJyuoie",
    roomName: "home-8ctR-58kI",
    startedAt: "Oct 3, 2025, 2:29:50 pm",
    endedAt: "Oct 3, 2025, 2:30:34 pm",
    duration: "44 sec",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_HcyF34cu6foK",
    roomName: "home-8GGe-J5ZN",
    startedAt: "Oct 3, 2025, 2:29:48 pm",
    endedAt: "Oct 3, 2025, 2:29:53 pm",
    duration: "5 sec",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
  {
    sessionId: "RM_pzf5CvfGa2pL",
    roomName: "home-Knqe-FW6u",
    startedAt: "Oct 3, 2025, 2:20:52 pm",
    endedAt: "Oct 3, 2025, 2:22:51 pm",
    duration: "2 min",
    participants: 2,
    features: "Agents",
    status: "CLOSED",
  },
];

// Voice Tab Types
export type Language = {
  code: string;
  name: string;
  flag: string;
};

export type VoiceProvider = {
  id: string;
  name: string;
  logoUrl?: string;
};

export type Voice = {
  id: string;
  name: string;
  description: string;
  provider: string;
  gender: "male" | "female" | "neutral";
  language: string;
  flag: string;
};

export type LLMModel = {
  id: string;
  name: string;
  provider: string;
};

export type LLMProvider = {
  id: string;
  name: string;
};

export type STTService = {
  id: string;
  name: string;
};

export type RealtimeProvider = {
  id: string;
  name: string;
};

export type RealtimeModel = {
  id: string;
  name: string;
  provider: string;
};

export type TTSService = {
  id: string;
  name: string;
  logoUrl?: string;
};

export type ToolItem = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  isBuiltIn: boolean;
  method?: "GET" | "POST";
  endpoint?: string;
  headers?: Array<{ name: string; value: string }>;
  keys?: Array<{ secretName: string; secretValue: string }>;
};

// Mock Data for Voice Tab
export const mockLanguages: Language[] = [
  { code: "en-US", name: "English", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", flag: "🇬🇧" },
  { code: "es-ES", name: "Spanish", flag: "🇪🇸" },
  { code: "fr-FR", name: "French", flag: "🇫🇷" },
  { code: "de-DE", name: "German", flag: "🇩🇪" },
  { code: "ja-JP", name: "Japanese", flag: "🇯🇵" },
  { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
];

export const mockVoiceProviders: VoiceProvider[] = [
  { id: "elevenlabs", name: "ElevenLabs" },
  { id: "openai", name: "OpenAI" },
  { id: "google", name: "Google" },
  { id: "azure", name: "Azure" },
];

export const mockVoices: Voice[] = [
  {
    id: "voice-1",
    name: "Voice name",
    description: "Voice description",
    provider: "elevenlabs",
    gender: "female",
    language: "en-US",
    flag: "🇺🇸",
  },
  {
    id: "sophia",
    name: "Sophia",
    description: "A friendly and engaging voice, ideal for conversational applications.",
    provider: "openai",
    gender: "female",
    language: "en-US",
    flag: "🇺🇸",
  },
  {
    id: "liam",
    name: "Liam",
    description: "A warm and smooth voice, perfect for narrations and audiobooks.",
    provider: "openai",
    gender: "male",
    language: "en-GB",
    flag: "🇬🇧",
  },
  {
    id: "aiko",
    name: "Aiko",
    description: "A soft and clear voice, designed for educational content and interactive learning.",
    provider: "google",
    gender: "female",
    language: "ja-JP",
    flag: "🇯🇵",
  },
  {
    id: "kai",
    name: "Kai",
    description: "A rich and warm voice, perfect for storytelling and immersive experiences.",
    provider: "google",
    gender: "male",
    language: "ja-JP",
    flag: "🇯🇵",
  },
  {
    id: "yuki",
    name: "Yuki",
    description: "A bright and energetic voice, ideal for commercials and vibrant presentations.",
    provider: "elevenlabs",
    gender: "female",
    language: "ja-JP",
    flag: "🇯🇵",
  },
];

export const mockLLMProviders: LLMProvider[] = [
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "google", name: "Google" },
];

export const mockLLMModels: LLMModel[] = [
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "openai" },
  { id: "gpt-4", name: "GPT-4", provider: "openai" },
  { id: "gpt-4o", name: "GPT-4o", provider: "openai" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", provider: "anthropic" },
  { id: "claude-3-opus", name: "Claude 3 Opus", provider: "anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "google" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "google" },
];

export const mockSTTServices: STTService[] = [
  { id: "deepgram", name: "Deepgram" },
  { id: "openai-whisper", name: "OpenAI Whisper" },
  { id: "google-stt", name: "Google Speech-to-Text" },
  { id: "azure-stt", name: "Azure Speech" },
];

export const mockRealtimeProviders: RealtimeProvider[] = [
  { id: "openai-realtime", name: "OpenAI Realtime API" },
  { id: "elevenlabs-conversational", name: "ElevenLabs Conversational AI" },
  { id: "azure-realtime", name: "Azure Realtime" },
];

export const mockRealtimeModels: RealtimeModel[] = [
  { id: "gemini-2.0-flash-exp", name: "gemini-2.0-flash-exp", provider: "google" },
  { id: "gpt-4o-realtime-preview", name: "gpt-4o-realtime-preview", provider: "openai" },
];

export const mockTTSServices: TTSService[] = [
  { id: "elevenlabs", name: "ElevenLabs" },
  { id: "openai-tts", name: "OpenAI TTS" },
  { id: "cartesia", name: "Cartesia" },
  { id: "azure-tts", name: "Azure Speech" },
];

export const mockTools: ToolItem[] = [
  {
    id: "end-call",
    name: "End call",
    description: "Allows your agent to end the call with the user",
    enabled: true,
    isBuiltIn: true,
  },
  {
    id: "custom-tool-1",
    name: "custom_tool",
    description: "The user wrote this description in the panel.",
    enabled: true,
    isBuiltIn: false,
  },
];

// Sample code for preview panel
export const sampleAgentCode = `import logging

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
)
from livekit.plugins import noise_cancellation, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a helpful voice AI assistant. The user is interacting with you via voice, even if you perceive the conversation as text.
            You eagerly assist users with their questions by providing information from your extensive knowledge.
            Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.
            You are curious, friendly, and have a sense of humor.""",
        )

    # To add tools, use the @function_tool decorator.
    # Here's an example that adds a simple weather tool.
    # You also have to add \`from livekit.agents import function_tool, RunContext\` to the top of this file
    # @function_tool
    # async def lookup_weather(self, context: RunContext, location: str):
    #     """Use this tool to look up current weather information in the given location.
    #
    #     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.
    #
    #     Args:
    #         location: The location to look up weather information for (e.g. city name)
    #     """
    #
    #     logger.info(f"Looking up weather for {location}")
    #
    #     return "sunny with a temperature of 70 degrees."


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt="assemblyai/universal-streaming:en",
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm="openai/gpt-4.1-mini",
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts="cartesia/sonic-2:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add \`from livekit.plugins import openai\` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use \`BVCTelephony\` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
`;